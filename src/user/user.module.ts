import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserFacade } from './application/user.facade';
import { IUserService } from './domain/user-service.interface';
import { IUserWriter } from './domain/user-writer.interface';
import { UserServiceImpl } from './domain/user-service.impl';
import { UserWriterImpl } from './infrastructure/user-writer.impl';
import { UserApiController } from './interfaces/user-api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserFacade,
    { provide: IUserService, useClass: UserServiceImpl },
    { provide: IUserWriter, useClass: UserWriterImpl },
  ],
  controllers: [UserApiController],
})
export class UserModule {}
