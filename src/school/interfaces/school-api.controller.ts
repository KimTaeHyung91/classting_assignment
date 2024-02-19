import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { SchoolFacade } from '../application/school.facade';
import { SchoolDto } from './school.dto';
import { BaseResponse } from '../../base/response/base-response';
import { SchoolDtoMapper } from './school.dto.mapper';
import { SchoolCommand } from '../domain/school.command';

@Controller('/api/v1/school')
export class SchoolApiController {
  constructor(private readonly schoolFacade: SchoolFacade) {}

  // 페이지 발행
  @Post('/page')
  async publishSchoolPage(@Body() request: SchoolDto.RequestCreateSchoolPage) {
    const command = SchoolDtoMapper.of(SchoolCommand.CreateSchoolPage, request);

    const schoolPageToken = await this.schoolFacade.createSchoolPage(command);

    const response = SchoolDtoMapper.of(SchoolDto.ResponseSchoolPageToken, {
      schoolPageToken,
    });

    return BaseResponse.success(response);
  }

  // 소식 작성
  @Post('/news')
  async writeSchoolNews(@Body() request: SchoolDto.RequestCreateSchoolNews) {
    const command = SchoolDtoMapper.of(SchoolCommand.CreateSchoolNews, request);

    const schoolNewsToken = await this.schoolFacade.createSchoolNews(command);

    const response = SchoolDtoMapper.of(SchoolDto.ResponseSchoolNewsToken, {
      schoolNewsToken,
    });

    return BaseResponse.success(response);
  }

  // 소식 수정
  @Put('/news')
  async modifySchoolNews(@Body() request: SchoolDto.RequestModifySchoolNews) {
    const command = SchoolDtoMapper.of(SchoolCommand.ModifySchoolNews, request);

    const schoolNewsToken = await this.schoolFacade.modifySchoolNews(command);

    const response = SchoolDtoMapper.of(SchoolDto.ResponseSchoolNewsToken, {
      schoolNewsToken,
    });

    return BaseResponse.success(response);
  }

  // 소식 삭제
  @Delete('/news')
  async removeSchoolNews(@Body() request: SchoolDto.RequestRemoveSchoolNews) {
    await this.schoolFacade.removeSchoolNews(request.schoolNewsToken);

    return BaseResponse.success(null);
  }
}
