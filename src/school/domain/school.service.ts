import { SchoolCommand } from './school.command';

export const SchoolService = Symbol('SchoolService');

export interface SchoolService {
  createSchoolPage(command: SchoolCommand.CreateSchoolPage): Promise<string>;

  createSchoolNews(command: SchoolCommand.CreateSchoolNews): Promise<string>;

  modifySchoolNews(command: SchoolCommand.ModifySchoolNews): Promise<string>;

  removeSchoolNews(token: string): Promise<void>;
}
