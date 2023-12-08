import { UserInfo } from '../domain/user.info';
import { UserDto } from './user.dto';
import { ClassConstructor } from 'class-transformer';
import { UserCommand } from '../domain/user.command';
import { ClassTransformUtil } from '../../util/class-transform.util';

type ClsType =
  | ClassConstructor<UserDto.Main>
  | ClassConstructor<UserDto.RegisterUserResponse>
  | ClassConstructor<UserCommand.RegisterUser>;

type TargetType = UserInfo.Main | UserDto.RegisterUserRequest;

type ReturnType =
  | UserDto.Main
  | UserDto.RegisterUserResponse
  | UserCommand.RegisterUser;

export namespace UserDtoMapper {
  export function of(
    cls: ClassConstructor<UserDto.Main>,
    target: UserInfo.Main,
  ): UserDto.Main;

  export function of(
    cls: ClassConstructor<UserDto.RegisterUserResponse>,
    target: UserInfo.Main,
  ): UserDto.RegisterUserResponse;

  export function of(
    cls: ClassConstructor<UserCommand.RegisterUser>,
    target: UserDto.RegisterUserRequest,
  ): UserCommand.RegisterUser;

  export function of(cls: ClsType, target: TargetType): ReturnType {
    return ClassTransformUtil.excludeConvertTo(cls, target);
  }
}
