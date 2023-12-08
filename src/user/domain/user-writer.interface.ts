import { UserEntity } from './user.entity';

export const IUserWriter = Symbol('IUserWriter');

export interface IUserWriter {
  save(entity: UserEntity): Promise<UserEntity>;
}
