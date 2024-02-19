import { Test } from '@nestjs/testing';
import { SchoolModule } from '../../src/school/school.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { SchoolWriter } from '../../src/school/domain/school.writer';
import { SchoolWriterImpl } from '../../src/school/infrastructure/school.writer.impl';
import { EntityManager } from 'typeorm';
import { SchoolPageEntity } from '../../src/school/domain/school-page.entity';
import { SchoolNewsEntity } from '../../src/school/domain/news/school-news.entity';
import { SchoolReader } from '../../src/school/domain/school.reader';
import { SchoolReaderImpl } from '../../src/school/infrastructure/school.reader.impl';
import { path } from 'app-root-path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

describe('Entity save to Mysql in School Domain', () => {
  jest.setTimeout(1_000 * 60 * 60);
  let dbContainer: StartedMySqlContainer;
  let schoolWriter: SchoolWriter;
  let schoolReader: SchoolReader;
  let em: EntityManager;

  beforeAll(async () => {
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
          entities: [`${path}/src/school/**/*.entity.ts`],
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
        SchoolModule,
      ],
    }).compile();

    schoolWriter = module.get<SchoolWriterImpl>(SchoolWriter);
    schoolReader = module.get<SchoolReaderImpl>(SchoolReader);
    em = module.get(EntityManager);
  });

  it('should be defined', () => {
    expect(em).toBeDefined();
    expect(schoolWriter).toBeDefined();
    expect(schoolReader).toBeDefined();
  });

  it('스쿨 페이지 엔티티는 db 저장되어야된다.', async () => {
    //given
    const schoolName = 'test';
    const location = 'Seoul';

    const schoolPageEntity = SchoolPageEntity.of({
      schoolName,
      location,
    });

    //when
    const savedEntity = await schoolWriter.save(schoolPageEntity);

    //then
    expect(savedEntity.schoolPageToken).not.toBeUndefined();
    expect(savedEntity.schoolName).toEqual(schoolName);
    expect(savedEntity.location).toEqual(location);
    console.log(savedEntity.createdAt);
  });

  it('스쿨 뉴스 엔티티는 db 저장되어야된다.', async () => {
    //given
    const schoolName = 'test';
    const location = 'Seoul';

    const title = 'title';
    const content = 'content';

    const schoolPageEntity = SchoolPageEntity.of({
      schoolName,
      location,
    });

    const schoolNewsEntity = SchoolNewsEntity.of({
      title,
      content,
    });

    schoolNewsEntity.setSchoolPage(schoolPageEntity);

    //when
    const saved = await schoolWriter.save(schoolNewsEntity);

    //then
    expect(saved.title).toEqual(title);
    expect(saved.content).toEqual(content);
    expect(saved.schoolPage.schoolName).toEqual(schoolName);
    expect(saved.schoolPage.location).toEqual(location);
  });

  it('스쿨 뉴스 엔티티 db에 titie이 갱신되어야된다.', async () => {
    //given
    const schoolName = 'test';
    const location = 'Seoul';

    const title = 'title';
    const content = 'content';

    const schoolPageEntity = SchoolPageEntity.of({
      schoolName,
      location,
    });

    const schoolNewsEntity = SchoolNewsEntity.of({
      title,
      content,
    });

    schoolNewsEntity.setSchoolPage(schoolPageEntity);
    const saved = await schoolWriter.save(schoolNewsEntity);

    const changeTitle = 'change title';

    //when
    saved.changeTitle(changeTitle);
    await schoolWriter.update(saved);

    //then
    expect(saved.title).toEqual(changeTitle);
    expect(saved.content).toEqual(content);
  });

  it('스쿨 뉴스 엔티티 db에 content가 갱신되어야된다.', async () => {
    //given
    const schoolName = 'test';
    const location = 'Seoul';

    const title = 'title';
    const content = 'content';

    const schoolPageEntity = SchoolPageEntity.of({
      schoolName,
      location,
    });

    const schoolNewsEntity = SchoolNewsEntity.of({
      title,
      content,
    });

    schoolNewsEntity.setSchoolPage(schoolPageEntity);
    const saved = await schoolWriter.save(schoolNewsEntity);

    const changeContent = 'change content';

    //when
    saved.changeContent(changeContent);
    await schoolWriter.update(saved);

    //then
    expect(saved.title).toEqual(title);
    expect(saved.content).toEqual(changeContent);
  });

  afterAll(async () => {
    await em.clear(SchoolNewsEntity);
    await em.clear(SchoolPageEntity);
    await dbContainer.stop({ remove: true });
  });
});
