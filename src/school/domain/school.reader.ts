import { SchoolPageEntity } from './school-page.entity';
import { SchoolNewsEntity } from './news/school-news.entity';

export const SchoolReader = Symbol('SchoolReader');

export interface SchoolReader {
  getSchoolPageBy(token: string): Promise<SchoolPageEntity>;

  getSchoolNewsBy(token: string): Promise<SchoolNewsEntity>;
}
