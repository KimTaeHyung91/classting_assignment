import { StudentSchoolPageEntity } from './student-school-page.entity';
import { StudentEntity } from './student.entity';

export const StudentWriter = Symbol('StudentWriter');

export interface StudentWriter {
  save(entity: StudentEntity): Promise<StudentEntity>;

  save(entity: StudentSchoolPageEntity): Promise<StudentSchoolPageEntity>;
}
