import { ClassConstructor, plainToInstance } from 'class-transformer';
import { UserSearch } from '../../user/domain/user.search';
import { AuthDto } from './auth.dto';

export namespace AuthDtoMapper {
  export function of(
    cls: ClassConstructor<UserSearch.LoginSearch>,
    target: AuthDto.LoginRequest,
  ) {
    return plainToInstance(cls, target, { excludeExtraneousValues: true });
  }
}
