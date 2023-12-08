import { ClassConstructor, plainToInstance } from 'class-transformer';
import { UserInfo } from './user.info';
import { UserEntity } from './user.entity';

export namespace UserInfoMapper {
  export function of(
    cls: ClassConstructor<UserInfo.SignInfo>,
    target: UserEntity,
  ) {
    return plainToInstance(cls, target, { excludeExtraneousValues: true });
  }
}
