import { SchoolPageEntity } from '../school-page.entity';

export const InternalSchoolReader = Symbol('SchoolInternalService');

export interface InternalSchoolReader {
  getSchoolPageBy(token: string): Promise<SchoolPageEntity>;
}
