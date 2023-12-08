import { UserEntity } from './user.entity';

export const IUserReader = Symbol('IUserReader');

export interface IUserReader {
  getUserByEmail(email: string): Promise<UserEntity>;
}
