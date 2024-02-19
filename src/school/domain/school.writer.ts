import { SchoolPageEntity } from './school-page.entity';
import { SchoolNewsEntity } from './news/school-news.entity';

export const SchoolWriter = Symbol('SchoolWriter');

export interface SchoolWriter {
  save(entity: SchoolPageEntity): Promise<SchoolPageEntity>;

  save(entity: SchoolNewsEntity): Promise<SchoolNewsEntity>;

  update(entity: SchoolNewsEntity): Promise<void>;

  remove(entity: SchoolNewsEntity): Promise<void>;
}
