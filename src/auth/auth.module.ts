import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { AuthApiController } from './interfaces/auth-api.controller';
import { AuthFacade } from './application/auth.facade';

@Module({
  imports: [UserModule],
  providers: [JwtService, AuthFacade],
  controllers: [AuthApiController],
})
export class AuthModule {}
