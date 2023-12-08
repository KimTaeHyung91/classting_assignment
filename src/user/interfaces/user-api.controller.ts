import { Body, Controller, Post } from '@nestjs/common';
import { UserFacade } from '../application/user.facade';
import { UserDto } from './user.dto';
import { UserDtoMapper } from './user-dto.mapper';
import { UserCommand } from '../domain/user.command';
import { BaseResponse } from '../../base/response/base-response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/user')
@ApiTags('User API')
export class UserApiController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  @ApiOperation({
    summary: '유저 등록 API',
    description: '학생, 학교 관리자를 등록 할 수 있다.',
  })
  async registerUser(@Body() request: UserDto.RegisterUserRequest) {
    const command = UserDtoMapper.of(UserCommand.RegisterUser, request);
    const main = await this.userFacade.registerUser(command);
    const response = UserDtoMapper.of(UserDto.RegisterUserResponse, main);

    return BaseResponse.success(response);
  }
}
