import { IUserService } from './user-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserCommand } from './user.command';
import { UserInfo } from './user.info';
import { IUserWriter } from './user-writer.interface';
import { ClassTransformUtil } from '../../util/class-transform.util';
import { EncryptUtil } from '../../util/encrypt.util';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject(IUserWriter)
    private readonly userWriter: IUserWriter,
  ) {}

  @Transactional()
  async registerUser(
    command: UserCommand.RegisterUser,
  ): Promise<UserInfo.Main> {
    const password = await EncryptUtil.encypt(command.password);
    const userEntity = await this.userWriter.save(command.toEntity(password));

    return ClassTransformUtil.excludeConvertTo(UserInfo.Main, userEntity);
  }
}
