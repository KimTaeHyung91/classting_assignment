import { Inject, Injectable } from '@nestjs/common';
import { StudentService } from '../domain/student.service';
import { StudentCommand } from '../domain/student.command';
import { StudentInfo } from '../domain/student.info';
import { StudentSearch } from '../domain/student.search';

@Injectable()
export class StudentFacade {
  constructor(
    @Inject(StudentService)
    private readonly studentService: StudentService,
  ) {}

  async registerStudent(
    command: StudentCommand.RegisterStudent,
  ): Promise<string> {
    return await this.studentService.registerStudent(command);
  }

  async subscribeSchoolPage(
    command: StudentCommand.SubscribeSchoolPage,
  ): Promise<void> {
    await this.studentService.subscribeSchoolPage(command);
  }

  async retrieveSubscribeSchoolPageList(
    token: string,
    search: StudentSearch.RetrieveSubscribeSchoolPageListSearch,
  ): Promise<Array<StudentInfo.SubscribeInfo>> {
    return await this.studentService.retrieveSubscribeSchoolPageList(
      token,
      search,
    );
  }

  async cancelSubscribeSchoolPage(
    command: StudentCommand.CancelSubscribeSchoolPage,
  ) {
    await this.studentService.cancelSubscribeSchoolPage(command);
  }

  async retrieveNewsBySubscribeSchoolPage(
    token: string,
    search: StudentSearch.RetrieveNewsBySubscribeSchoolPageSearch,
  ): Promise<Array<StudentInfo.SubscribeNews>> {
    return await this.studentService.retrieveNewsBySubscribeSchoolPage(
      token,
      search,
    );
  }
}
