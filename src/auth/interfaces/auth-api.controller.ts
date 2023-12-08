import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthFacade } from '../application/auth.facade';
import { AuthDtoMapper } from './auth-dto.mapper';
import { UserSearch } from '../../user/domain/user.search';
import { Response } from 'express';
import { BaseResponse } from '../../base/response/base-response';

@Controller('/api/v1/auth')
export class AuthApiController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('/login')
  async login(
    @Body() request: AuthDto.LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginSearch = AuthDtoMapper.of(UserSearch.LoginSearch, request);
    const accessToken = await this.authFacade.login(loginSearch);

    res.setHeader('Authorization', `Bearer ${accessToken}`);

    return BaseResponse.success(null);
  }
}
