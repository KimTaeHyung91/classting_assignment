import { StudentService } from './student.service';
import { Inject, Injectable } from '@nestjs/common';
import { StudentCommand } from './student.command';
import { StudentReader } from './student.reader';
import { StudentWriter } from './student.writer';
import { Transactional } from 'typeorm-transactional';
import { StudentInfo } from './student.info';
import { StudentSearch } from './student.search';
import { InternalSchoolReader } from '../../school/domain/internal/internal-school.reader';
import { StudentMapper } from './student.mapper';
import { SchoolNewsEntity } from '../../school/domain/news/school-news.entity';
import { DateUtil } from '../../util/date.util';

@Injectable()
export class StudentServiceImpl implements StudentService {
  constructor(
    @Inject(InternalSchoolReader)
    private readonly internalSchoolReader: InternalSchoolReader,
    @Inject(StudentReader)
    private readonly studentReader: StudentReader,
    @Inject(StudentWriter)
    private readonly studentWriter: StudentWriter,
  ) {}

  @Transactional()
  async registerStudent(
    command: StudentCommand.RegisterStudent,
  ): Promise<string> {
    const student = await this.studentWriter.save(command.toEntity());

    return student.studentToken;
  }

  @Transactional()
  async subscribeSchoolPage(
    command: StudentCommand.SubscribeSchoolPage,
  ): Promise<void> {
    const student = await this.studentReader.getStudentBy(command.studentToken);
    const schoolPage = await this.internalSchoolReader.getSchoolPageBy(
      command.schoolPageToken,
    );

    await this.studentWriter.save(command.toEntity(student, schoolPage));
  }

  async retrieveSubscribeSchoolPageList(
    token: string,
    search: StudentSearch.RetrieveSubscribeSchoolPageListSearch,
  ): Promise<Array<StudentInfo.SubscribeInfo>> {
    const savedStudent = await this.studentReader.getStudentBy(token);
    const student = await this.studentReader.getStudentSubscribePage(
      savedStudent.id,
      search,
    );

    return student.studentSchoolPageList.map((studentSchoolPage) =>
      StudentMapper.of(StudentInfo.SubscribeInfo, studentSchoolPage.schoolPage),
    );
  }

  @Transactional()
  async cancelSubscribeSchoolPage(
    command: StudentCommand.CancelSubscribeSchoolPage,
  ): Promise<void> {
    const savedStudent = await this.studentReader.getStudentBy(
      command.studentToken,
    );
    const student = await this.studentReader.getStudentSubscribePage(
      savedStudent.id,
    );

    student.cancelSubscribe(command.schoolPageToken);

    await this.studentWriter.save(student);
  }

  async retrieveNewsBySubscribeSchoolPage(
    token: string,
    search: StudentSearch.RetrieveNewsBySubscribeSchoolPageSearch,
  ): Promise<Array<StudentInfo.SubscribeNews>> {
    const savedStudent = await this.studentReader.getStudentBy(token);
    const student = await this.studentReader.getStudentSubscribePage(
      savedStudent.id,
    );

    const schoolPage = student.findSchoolPage(search.schoolPageToken);
    const schoolNewsEntities = await schoolPage.lazyLoadSchoolNews();

    this.recentSchoolNewsListSort(schoolNewsEntities);

    const pageSchoolNews = schoolNewsEntities.slice(
      search.offset,
      search.limit,
    );

    return pageSchoolNews.map((schoolNews) =>
      StudentMapper.of(StudentInfo.SubscribeNews, schoolNews),
    );
  }

  private recentSchoolNewsListSort(schoolNewsList: Array<SchoolNewsEntity>) {
    schoolNewsList.sort((prev, next) =>
      DateUtil.toLocalDateTime(prev.createdAt).isBefore(
        DateUtil.toLocalDateTime(next.createdAt),
      )
        ? 1
        : -1,
    );
  }
}
