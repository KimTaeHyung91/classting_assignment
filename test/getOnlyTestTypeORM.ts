import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { StartedMySqlContainer } from '@testcontainers/mysql';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

export function getOnlyTestTypeORM(
  dbContainer: StartedMySqlContainer,
  entity: any[],
): TypeOrmModuleAsyncOptions {
  return {
    useFactory: () => {
      return {
        type: 'mysql',
        host: dbContainer.getHost(),
        username: dbContainer.getUsername(),
        password: dbContainer.getRootPassword(),
        port: dbContainer.getPort(),
        database: dbContainer.getDatabase(),
        entities: entity,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
      };
    },
    dataSourceFactory: async (option) =>
      addTransactionalDataSource(new DataSource(option)),
  };
}
