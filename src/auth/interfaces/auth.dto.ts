import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export namespace AuthDto {
  export class LoginRequest {
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @Expose()
    @IsNotEmpty()
    readonly password: string;
  }
}
