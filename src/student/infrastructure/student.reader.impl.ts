import { StudentReader } from '../domain/student.reader';
import { Injectable } from '@nestjs/common';
import { StudentEntity } from '../domain/student.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSearch } from '../domain/student.search';

@Injectable()
export class StudentReaderImpl implements StudentReader {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudentBy(token: string): Promise<StudentEntity> {
    return await this.studentRepository
      .findOneOrFail({
        where: {
          studentToken: token,
        },
      })
      .catch(() => {
        throw new EntityNotFoundError(StudentEntity, token);
      });
  }
  async getStudentSubscribePage(
    studentId: number,
    search?: StudentSearch.RetrieveSubscribeSchoolPageListSearch,
  ): Promise<any> {
    const queryBuilder = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect(
        'student.studentSchoolPageList',
        'studentSchoolPageList',
      )
      .innerJoinAndSelect('studentSchoolPageList.schoolPage', 'schoolPage')
      .where('student.id = :id', { id: studentId });

    if (search) {
      queryBuilder.offset(search.offset).limit(search.limit);
    }

    return queryBuilder.getOne();
  }
}
