import { Test } from '@nestjs/testing';
import { UserModule } from '../../../src/user/user.module';
import { IUserService } from '../../../src/user/domain/user-service.interface';
import { UserServiceImpl } from '../../../src/user/domain/user-service.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOnlyTestTypeORM } from '../../getOnlyTestTypeORM';
import { UserEntity } from '../../../src/user/domain/user.entity';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { UserRole } from '../../../src/base/role/user.role';
import { plainToInstance } from 'class-transformer';
import { UserCommand } from '../../../src/user/domain/user.command';
import { EntityManager } from 'typeorm';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';

describe('UserServiceTest', () => {
  let dbContainer: StartedMySqlContainer;
  let service: IUserService;
  let em: EntityManager;

  beforeAll(async () => {
    initializeTransactionalContext();
    dbContainer = await new MySqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(
          getOnlyTestTypeORM(dbContainer, [UserEntity]),
        ),
        UserModule,
      ],
    }).compile();

    service = module.get<UserServiceImpl>(IUserService);
    em = module.get<EntityManager>(EntityManager);
  });

  it('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('학생 등록이 가능해야된다.', async () => {
    // given
    const command = initUserInfo(
      'student',
      'student@test.com',
      'student',
      UserRole.STUDENT,
    );

    const registerUser = convertToRegisterUser(command);

    // when
    const main = await service.registerUser(registerUser);

    // then
    expect(main.userToken).not.toBeNull();
    expect(main.userName).toEqual(command.userName);
    expect(main.email).toEqual(command.email);
    expect(main.role).toEqual(command.role);
  });

  it('관리자 등록이 가능해야된다.', async () => {
    // given
    const command = initUserInfo(
      'userAdmin',
      'userAdmin@test.com',
      'admin',
      UserRole.ADMIN,
    );

    const registerUser = convertToRegisterUser(command);

    // when
    const main = await service.registerUser(registerUser);

    // then
    expect(main.userToken).not.toBeNull();
    expect(main.userName).toEqual(command.userName);
    expect(main.email).toEqual(command.email);
    expect(main.role).toEqual(command.role);
  });

  afterEach(async () => {
    await em.clear(UserEntity);
  });

  afterAll(async () => {
    await dbContainer.stop({ remove: true, removeVolumes: true });
  });

  function initUserInfo(
    userName: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    return {
      userName,
      email,
      password,
      role,
    };
  }

  function convertToRegisterUser(obj: Record<string, any>) {
    return plainToInstance(UserCommand.RegisterUser, obj, {
      excludeExtraneousValues: true,
    });
  }
});
