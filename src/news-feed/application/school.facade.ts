import { Inject, Injectable } from '@nestjs/common';
import { ISchoolService } from '../domain/school/school-service.interface';
import { SchoolCommand } from '../domain/school/school.command';

@Injectable()
export class SchoolFacade {
  constructor(
    @Inject(ISchoolService)
    private readonly schoolService: ISchoolService,
  ) {}

  async registerSchoolPage(
    command: SchoolCommand.RegisterSchoolPage,
  ): Promise<string> {
    return await this.schoolService.registerSchoolPage(command);
  }
}
