import { Expose } from 'class-transformer';

export namespace UserSearch {
  export class LoginSearch {
    @Expose()
    readonly email: string;

    @Expose()
    readonly password: string;
  }
}
