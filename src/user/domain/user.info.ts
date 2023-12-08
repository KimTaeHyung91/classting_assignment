import { UserRole } from '../../base/role/user.role';
import { Expose } from 'class-transformer';

export namespace UserInfo {
  export class Main {
    @Expose()
    readonly userToken: string;

    @Expose()
    readonly userName: string;

    @Expose()
    readonly email: string;

    @Expose()
    readonly role: UserRole;
  }

  export class SignInfo {
    @Expose({ name: 'userToken' })
    readonly sub: number;

    @Expose()
    readonly email: string;
  }
}
