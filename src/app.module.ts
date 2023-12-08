import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from './user/domain/user.entity';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import * as dotenv from 'dotenv';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.${process.env.NODE_ENV}.env`],
      load: [configuration],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret:
          configService.get<ConfigType<typeof configuration>>('config').jwt
            .secretKey,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config =
          configService.get<ConfigType<typeof configuration>>('config');

        return {
          type: 'mysql',
          host: config.db.host,
          username: config.db.username,
          password: config.db.password,
          database: config.db.database,
          port: +config.db.port,
          synchronize: false,
          logging: true,
          entities: [UserEntity],
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      dataSourceFactory: async (option) =>
        addTransactionalDataSource(new DataSource(option)),

      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
