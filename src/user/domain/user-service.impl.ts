import { IUserService } from './user-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserCommand } from './user.command';
import { UserInfo } from './user.info';
import { IUserWriter } from './user-writer.interface';
import { ClassTransformUtil } from '../../util/class-transform.util';
import { EncryptUtil } from '../../util/encrypt.util';
import { Transactional } from 'typeorm-transactional';
import { UserSearch } from './user.search';
import { IUserReader } from './user-reader.interface';
import { UserValidator } from './user.validator';
import { UserInfoMapper } from './user-info.mapper';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject(IUserWriter)
    private readonly userWriter: IUserWriter,
    @Inject(IUserReader)
    private readonly userReader: IUserReader,
    private readonly userValidator: UserValidator,
  ) {}

  @Transactional()
  async registerUser(
    command: UserCommand.RegisterUser,
  ): Promise<UserInfo.Main> {
    const password = await EncryptUtil.encypt(command.password);
    const userEntity = await this.userWriter.save(command.toEntity(password));

    return ClassTransformUtil.excludeConvertTo(UserInfo.Main, userEntity);
  }

  async retrieveSignInfo(
    search: UserSearch.LoginSearch,
  ): Promise<UserInfo.SignInfo> {
    const user = await this.userReader.getUserByEmail(search.email);
    await this.userValidator.validateLoginUser(search, user);

    return UserInfoMapper.of(UserInfo.SignInfo, user);
  }
}
