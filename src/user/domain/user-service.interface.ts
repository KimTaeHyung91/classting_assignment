import { UserCommand } from './user.command';
import { UserInfo } from './user.info';

export const IUserService = Symbol('IUserService');

export interface IUserService {
  registerUser(command: UserCommand.RegisterUser): Promise<UserInfo.Main>;
}
