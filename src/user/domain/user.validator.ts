import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSearch } from './user.search';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserValidator {
  async validateLoginUser(search: UserSearch.LoginSearch, user: UserEntity) {
    if (!user) {
      throw new NotFoundException('not found user');
    }

    const isAuth = await bcrypt.compare(search.password, user.password);

    if (!isAuth) {
      throw new BadRequestException('not correct password');
    }
  }
}
