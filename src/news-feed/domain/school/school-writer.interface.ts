import { SchoolPageEntity } from './school-page.entity';

export const ISchoolWriter = Symbol('ISchoolWriter');

export interface ISchoolWriter {
  save(entity: SchoolPageEntity): Promise<SchoolPageEntity>;
}
