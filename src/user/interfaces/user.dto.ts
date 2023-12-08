import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace UserDto {
  export enum RegisterUserRole {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
  }

  export class RegisterUserRequest {
    @Expose()
    @IsNotEmpty()
    @ApiProperty({ description: '유저 이름', required: true })
    readonly userName: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: '유저 이메일', required: true })
    readonly email: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    @ApiProperty({ description: '유저 비밀번호', required: true })
    readonly password: string;

    @Expose()
    @IsEnum(RegisterUserRole)
    @IsNotEmpty()
    @ApiProperty({
      description: '유저 역할',
      required: true,
      enum: [RegisterUserRole.ADMIN, RegisterUserRole.STUDENT],
    })
    readonly role: RegisterUserRole;
  }

  export class RegisterUserResponse {
    @Expose()
    readonly userToken: string;
  }

  export class Main {
    @Expose()
    readonly userName: string;

    @Expose()
    readonly userToken: string;

    @Expose()
    readonly email: string;

    @Expose()
    @Transform(({ value }) => (value + '').toLowerCase())
    readonly role: string;
  }
}
