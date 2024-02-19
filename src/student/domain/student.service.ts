import { StudentCommand } from './student.command';
import { StudentInfo } from './student.info';
import { StudentSearch } from './student.search';

export const StudentService = Symbol('StudentService');

export interface StudentService {
  registerStudent(command: StudentCommand.RegisterStudent): Promise<string>;

  subscribeSchoolPage(
    command: StudentCommand.SubscribeSchoolPage,
  ): Promise<void>;

  retrieveSubscribeSchoolPageList(
    token: string,
    search: StudentSearch.RetrieveSubscribeSchoolPageListSearch,
  ): Promise<Array<StudentInfo.SubscribeInfo>>;

  cancelSubscribeSchoolPage(
    command: StudentCommand.CancelSubscribeSchoolPage,
  ): Promise<void>;

  retrieveNewsBySubscribeSchoolPage(
    token: string,
    search: StudentSearch.RetrieveNewsBySubscribeSchoolPageSearch,
  ): Promise<Array<StudentInfo.SubscribeNews>>;
}
