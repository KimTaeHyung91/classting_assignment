import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StudentFacade } from '../application/student.facade';
import { StudentDto } from './student.dto';
import { StudentDtoMapper } from './student.dto.mapper';
import { StudentCommand } from '../domain/student.command';
import { BaseResponse } from '../../base/response/base-response';
import { StudentSearch } from '../domain/student.search';
import { Page } from '../../base/page/page';

@Controller('/api/v1/student')
export class StudentApiController {
  constructor(private readonly studentFacade: StudentFacade) {}

  @Post()
  async registerStudent(@Body() request: StudentDto.RequestRegisterStudent) {
    const command = StudentDtoMapper.of(
      StudentCommand.RegisterStudent,
      request,
    );

    const studentToken = await this.studentFacade.registerStudent(command);

    const response = StudentDtoMapper.of(StudentDto.ResponseStudentToken, {
      studentToken,
    });

    return BaseResponse.success(response);
  }

  @Post('/school-page')
  async subscribeSchoolPage(
    @Body() request: StudentDto.RequestSubscribeSchoolPage,
  ) {
    const command = StudentDtoMapper.of(
      StudentCommand.SubscribeSchoolPage,
      request,
    );

    await this.studentFacade.subscribeSchoolPage(command);

    return BaseResponse.success(null);
  }

  @Get('/:studentToken')
  async retrieveSubscribeSchoolPageList(
    @Param('studentToken') studentToken: string,
    @Query() query: StudentDto.QueryRetrieveSubscribeSchoolPageList,
  ) {
    const search = StudentDtoMapper.of(
      StudentSearch.RetrieveSubscribeSchoolPageListSearch,
      query,
    );

    const subscribeInfos =
      await this.studentFacade.retrieveSubscribeSchoolPageList(
        studentToken,
        search,
      );

    const items = subscribeInfos.map((subscribeInfo) =>
      StudentDtoMapper.of(StudentDto.SubscribeMain, subscribeInfo),
    );

    return BaseResponse.success(
      Page.of({
        pageSize: query.limit,
        totalCount: subscribeInfos.length,
        items,
      }),
    );
  }

  @Delete('/school-page')
  async cancelSubscribeSchoolPage(
    @Body() request: StudentDto.RequestCancelSubscribeSchoolPage,
  ) {
    const command = StudentDtoMapper.of(
      StudentCommand.CancelSubscribeSchoolPage,
      request,
    );

    await this.studentFacade.cancelSubscribeSchoolPage(command);

    return BaseResponse.success(null);
  }

  @Get('/:studentToken/school-news')
  async retrieveNewsBySubscribeSchoolPage(
    @Param('studentToken') studentToken: string,
    @Query() query: StudentDto.QueryRetrieveNewsBySubscribeSchoolPage,
  ) {
    const search = StudentDtoMapper.of(
      StudentSearch.RetrieveNewsBySubscribeSchoolPageSearch,
      query,
    );

    const subscribeNewsList =
      await this.studentFacade.retrieveNewsBySubscribeSchoolPage(
        studentToken,
        search,
      );

    const items = subscribeNewsList.map((subscribeNews) =>
      StudentDtoMapper.of(StudentDto.SubscribeSchoolNewsMain, subscribeNews),
    );

    return BaseResponse.success(
      Page.of({
        pageSize: query.limit,
        totalCount: items.length,
        items,
      }),
    );
  }
}
