import { ISchoolWriter } from '../domain/school/school-writer.interface';
import { Injectable } from '@nestjs/common';
import { SchoolPageEntity } from '../domain/school/school-page.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SchoolWriterImpl implements ISchoolWriter {
  constructor(
    @InjectRepository(SchoolPageEntity)
    private readonly schoolPageRepository: Repository<SchoolPageEntity>,
  ) {}

  async save(entity: SchoolPageEntity): Promise<SchoolPageEntity> {
    return await this.schoolPageRepository.save(entity);
  }
}
