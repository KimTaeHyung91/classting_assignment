import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../../user/domain/user-service.interface';
import { JwtService } from '@nestjs/jwt';
import { UserSearch } from '../../user/domain/user.search';
import { ConfigType } from '@nestjs/config';
import configuration from '../../config/configuration';

@Injectable()
export class AuthFacade {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  async login(search: UserSearch.LoginSearch): Promise<string> {
    const signInfo = await this.userService.retrieveSignInfo(search);

    return this.jwtService.sign(
      { email: signInfo.email, sub: signInfo.sub },
      { secret: this.config.jwt.secretKey, expiresIn: '1h' },
    );
  }
}
