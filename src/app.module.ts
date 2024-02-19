import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import commonConfig from './config/common.config';
import dbConfig from './config/db.config';
import { SchoolModule } from './school/school.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.${process.env.NODE_ENV}.env`],
      load: [commonConfig, dbConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get<ConfigType<typeof dbConfig>>('db');
        const common = config.get<ConfigType<typeof commonConfig>>('common');

        return {
          ...db,
          type: 'mysql',
          synchronize: false,
          logging:
            common.nodeEnv === 'development'
              ? ['info', 'query', 'error']
              : false,
          entities: [`${__dirname}/**/domain/**/*.entity.js`],
          namingStrategy: new SnakeNamingStrategy(),
          migrationsRun: true,
          migrations: [`${__dirname}/migrations/*.js`],
        };
      },

      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('TypeORM Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    SchoolModule,
    StudentModule,
  ],
})
export class AppModule {}
