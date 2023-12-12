import { Body, Controller, Post } from '@nestjs/common';
import { SchoolDto } from './school.dto';
import { SchoolDtoMapper } from './school-dto.mapper';
import { SchoolCommand } from '../domain/school/school.command';
import { SchoolFacade } from '../application/school.facade';
import { BaseResponse } from '../../base/response/base-response';

@Controller('/api/v1/school')
export class SchoolApiController {
  constructor(private readonly schoolFacade: SchoolFacade) {}

  @Post('/page')
  async registerSchoolPage(@Body() dto: SchoolDto.RequestRegisterSchoolPage) {
    console.log(dto);
    const command = SchoolDtoMapper.of(SchoolCommand.RegisterSchoolPage, dto);
    const schoolPageToken = await this.schoolFacade.registerSchoolPage(command);
    const response = SchoolDtoMapper.of(SchoolDto.ResponseRegisterSchoolPage, {
      schoolPageToken,
    });

    return BaseResponse.success(response);
  }
}
