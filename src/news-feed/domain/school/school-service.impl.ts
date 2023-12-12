import { ISchoolService } from './school-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { SchoolCommand } from './school.command';
import { Transactional } from 'typeorm-transactional';
import { ISchoolWriter } from './school-writer.interface';

@Injectable()
export class SchoolServiceImpl implements ISchoolService {
  constructor(
    @Inject(ISchoolWriter)
    private readonly schoolWriter: ISchoolWriter,
  ) {}

  @Transactional()
  async registerSchoolPage(
    command: SchoolCommand.RegisterSchoolPage,
  ): Promise<string> {
    const schoolPageEntity = await this.schoolWriter.save(command.toEntity());
    return schoolPageEntity.schoolPageToken;
  }
}
