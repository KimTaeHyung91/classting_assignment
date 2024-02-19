import { InternalSchoolReader } from './internal-school.reader';
import { Inject, Injectable } from '@nestjs/common';
import { SchoolPageEntity } from '../school-page.entity';
import { SchoolReader } from '../school.reader';

@Injectable()
export class InternalSchoolReaderImpl implements InternalSchoolReader {
  constructor(
    @Inject(SchoolReader)
    private readonly schoolReader: SchoolReader,
  ) {}

  async getSchoolPageBy(token: string): Promise<SchoolPageEntity> {
    return await this.schoolReader.getSchoolPageBy(token);
  }
}
