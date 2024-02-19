import { StudentWriter } from '../domain/student.writer';
import { Injectable } from '@nestjs/common';
import { StudentSchoolPageEntity } from '../domain/student-school-page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../domain/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentWriterImpl implements StudentWriter {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(StudentSchoolPageEntity)
    private readonly studentSchoolPageRepository: Repository<StudentSchoolPageEntity>,
  ) {}

  async save(entity: StudentEntity | StudentSchoolPageEntity): Promise<any> {
    if (entity instanceof StudentEntity) {
      return await this.studentRepository.save(entity);
    } else if (entity instanceof StudentSchoolPageEntity) {
      return await this.studentSchoolPageRepository.save(entity);
    }
  }
}
