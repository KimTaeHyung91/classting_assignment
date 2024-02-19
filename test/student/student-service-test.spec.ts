import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { path } from 'app-root-path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { StudentService } from '../../src/student/domain/student.service';
import { StudentServiceImpl } from '../../src/student/domain/student.service.impl';
import { StudentModule } from '../../src/student/student.module';
import { SchoolModule } from '../../src/school/school.module';
import { plainToInstance } from 'class-transformer';
import { StudentCommand } from '../../src/student/domain/student.command';
import { DataSource, EntityManager } from 'typeorm';
import { StudentEntity } from '../../src/student/domain/student.entity';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';

describe('Student Service Test', () => {
  jest.setTimeout(1_000 * 60 * 60);
  let dbContainer: StartedMySqlContainer;
  let studentService: StudentService;
  let em: EntityManager;
  let ds: DataSource;

  beforeAll(async () => {
    initializeTransactionalContext();
    dbContainer = await new MySqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: dbContainer.getHost(),
          port: dbContainer.getPort(),
          username: dbContainer.getUsername(),
          password: dbContainer.getRootPassword(),
          database: dbContainer.getDatabase(),
          synchronize: true,
          entities: [`${path}/src/**/*.entity.ts`],
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
        SchoolModule,
        StudentModule,
      ],
    }).compile();

    studentService = module.get<StudentServiceImpl>(StudentService);
    em = module.get(EntityManager);
    ds = module.get(DataSource);

    addTransactionalDataSource(ds);
  });

  it('should be defined studentService, em', () => {
    expect(studentService).toBeDefined();
    expect(em).toBeDefined();
    expect(ds).toBeDefined();
  });

  it('학생은 등록되어야된다.', async () => {
    //given
    const studentName = '홍길자';
    const age = 18;
    const city = '서울';

    const command = plainToInstance(StudentCommand.RegisterStudent, {
      studentName,
      age,
      city,
    });

    //when
    const studentToken = await studentService.registerStudent(command);
    const student = await em.findOne(StudentEntity, {
      where: {
        studentToken,
      },
    });

    //then
    expect(typeof studentToken === 'string').toBeTruthy();
    expect(studentToken).not.toBeNull();
    expect(student.studentToken).toEqual(studentToken);
    expect(student.studentName).toEqual(studentName);
    expect(student.age).toEqual(age);
    expect(student.address.city).toEqual(city);
  });

  afterAll(async () => {
    await em.clear(StudentEntity);
    await dbContainer.stop({ remove: true });
  });
});
