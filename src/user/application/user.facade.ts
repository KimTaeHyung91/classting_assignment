import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../domain/user-service.interface';
import { UserCommand } from '../domain/user.command';
import { UserInfo } from '../domain/user.info';

@Injectable()
export class UserFacade {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  async registerUser(
    command: UserCommand.RegisterUser,
  ): Promise<UserInfo.Main> {
    return await this.userService.registerUser(command);
  }
}
