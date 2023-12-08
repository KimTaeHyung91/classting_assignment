import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserFacade } from './application/user.facade';
import { IUserService } from './domain/user-service.interface';
import { IUserWriter } from './domain/user-writer.interface';
import { UserServiceImpl } from './domain/user-service.impl';
import { UserWriterImpl } from './infrastructure/user-writer.impl';
import { UserApiController } from './interfaces/user-api.controller';
import { UserValidator } from './domain/user.validator';
import { IUserReader } from './domain/user-reader.interface';
import { UserReaderImpl } from './infrastructure/user-reader.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserFacade,
    { provide: IUserService, useClass: UserServiceImpl },
    { provide: IUserReader, useClass: UserReaderImpl },
    { provide: IUserWriter, useClass: UserWriterImpl },
    UserValidator,
  ],
  controllers: [UserApiController],
  exports: [IUserService],
})
export class UserModule {}
