import { Inject, Injectable } from '@nestjs/common';
import { SchoolService } from '../domain/school.service';
import { SchoolCommand } from '../domain/school.command';

@Injectable()
export class SchoolFacade {
  constructor(
    @Inject(SchoolService)
    private readonly schoolService: SchoolService,
  ) {}

  async createSchoolPage(
    command: SchoolCommand.CreateSchoolPage,
  ): Promise<string> {
    return await this.schoolService.createSchoolPage(command);
  }

  async createSchoolNews(
    command: SchoolCommand.CreateSchoolNews,
  ): Promise<string> {
    return await this.schoolService.createSchoolNews(command);
  }

  async modifySchoolNews(
    command: SchoolCommand.ModifySchoolNews,
  ): Promise<string> {
    return await this.schoolService.modifySchoolNews(command);
  }

  async removeSchoolNews(token: string): Promise<void> {
    await this.schoolService.removeSchoolNews(token);
  }
}
