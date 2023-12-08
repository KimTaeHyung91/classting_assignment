import { UserCommand } from './user.command';
import { UserInfo } from './user.info';
import { UserSearch } from './user.search';

export const IUserService = Symbol('IUserService');

export interface IUserService {
  registerUser(command: UserCommand.RegisterUser): Promise<UserInfo.Main>;

  retrieveSignInfo(search: UserSearch.LoginSearch): Promise<UserInfo.SignInfo>;
}
