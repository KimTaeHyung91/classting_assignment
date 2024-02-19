import { SchoolReader } from '../domain/school.reader';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SchoolPageEntity } from '../domain/school-page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolNewsEntity } from '../domain/news/school-news.entity';

@Injectable()
export class SchoolReaderImpl implements SchoolReader {
  constructor(
    @InjectRepository(SchoolPageEntity)
    private readonly schoolPageRepository: Repository<SchoolPageEntity>,
    @InjectRepository(SchoolNewsEntity)
    private readonly schoolNewsRepository: Repository<SchoolNewsEntity>,
  ) {}

  async getSchoolPageBy(token: string): Promise<SchoolPageEntity> {
    return await this.schoolPageRepository
      .findOneOrFail({
        where: {
          schoolPageToken: token,
        },
      })
      .catch(() => {
        throw new EntityNotFoundError(SchoolPageEntity, token);
      });
  }

  async getSchoolNewsBy(token: string): Promise<SchoolNewsEntity> {
    return await this.schoolNewsRepository
      .findOneOrFail({
        where: {
          schoolNewsToken: token,
        },
      })
      .catch(() => {
        throw new EntityNotFoundError(SchoolNewsEntity, token);
      });
  }
}
