import { SchoolWriter } from '../domain/school.writer';
import { Injectable } from '@nestjs/common';
import { SchoolPageEntity } from '../domain/school-page.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolNewsEntity } from '../domain/news/school-news.entity';

@Injectable()
export class SchoolWriterImpl implements SchoolWriter {
  constructor(
    @InjectRepository(SchoolPageEntity)
    private readonly schoolPageRepository: Repository<SchoolPageEntity>,
    @InjectRepository(SchoolNewsEntity)
    private readonly schoolNewsRepository: Repository<SchoolNewsEntity>,
  ) {}

  async save(entity: SchoolPageEntity | SchoolNewsEntity): Promise<any> {
    if (entity instanceof SchoolPageEntity) {
      return await this.schoolPageRepository.save(entity);
    } else if (entity instanceof SchoolNewsEntity) {
      return await this.schoolNewsRepository.save(entity);
    }
  }

  async update(entity: SchoolNewsEntity): Promise<void> {
    await this.schoolNewsRepository
      .createQueryBuilder('schoolNews')
      .update()
      .set({
        title: entity.title,
        content: entity.content,
      })
      .where('id = :id', { id: entity.id })
      .execute();
  }

  async remove(entity: SchoolNewsEntity): Promise<void> {
    await this.schoolNewsRepository.softDelete(entity.id);
  }
}
