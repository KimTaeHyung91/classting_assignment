import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { path } from 'app-root-path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SchoolModule } from '../../src/school/school.module';
import { EntityManager } from 'typeorm';

describe.skip('엔티티 제네레이터', () => {
  jest.setTimeout(1_000 * 60 * 60);
  let dbContainer: StartedMySqlContainer;
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
          entities: [`${path}/src/**/*.entity.ts`],
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
        SchoolModule,
      ],
    }).compile();

    em = module.get(EntityManager);
  });

  it('should be defined em', () => {
    expect(em).toBeDefined();
  });
});
