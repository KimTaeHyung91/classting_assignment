import { SchoolCommand } from './school.command';

export const ISchoolService = Symbol('ISchoolService');

export interface ISchoolService {
  registerSchoolPage(
    command: SchoolCommand.RegisterSchoolPage,
  ): Promise<string>;
}
