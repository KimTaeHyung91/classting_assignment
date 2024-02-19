import { StudentEntity } from './student.entity';
import { StudentSearch } from './student.search';

export const StudentReader = Symbol('StudentReader');

export interface StudentReader {
  getStudentBy(token: string): Promise<StudentEntity>;

  getStudentSubscribePage(studentId: number): Promise<StudentEntity>;

  getStudentSubscribePage(
    studentId: number,
    search: StudentSearch.RetrieveSubscribeSchoolPageListSearch,
  ): Promise<StudentEntity>;
}
