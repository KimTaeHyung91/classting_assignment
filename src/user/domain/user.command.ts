import { UserRole } from '../../base/role/user.role';
import { Expose } from 'class-transformer';
import { UserEntity } from './user.entity';

export namespace UserCommand {
  export class RegisterUser {
    @Expose()
    readonly userName: string;

    @Expose()
    readonly email: string;

    @Expose()
    readonly password: string;

    @Expose()
    readonly role: UserRole;

    toEntity(password: string) {
      return UserEntity.of({
        userName: this.userName,
        email: this.email,
        role: this.role,
        password,
      });
    }
  }
}
