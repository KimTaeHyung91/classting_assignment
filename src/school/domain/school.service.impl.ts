import { SchoolService } from './school.service';
import { Inject, Injectable } from '@nestjs/common';
import { SchoolCommand } from './school.command';
import { SchoolWriter } from './school.writer';
import { SchoolReader } from './school.reader';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class SchoolServiceImpl implements SchoolService {
  constructor(
    @Inject(SchoolReader)
    private readonly schoolReader: SchoolReader,
    @Inject(SchoolWriter)
    private readonly schoolWriter: SchoolWriter,
  ) {}

  @Transactional()
  async createSchoolPage(
    command: SchoolCommand.CreateSchoolPage,
  ): Promise<string> {
    const schoolPage = await this.schoolWriter.save(command.toEntity());
    return schoolPage.schoolPageToken;
  }

  @Transactional()
  async createSchoolNews(
    command: SchoolCommand.CreateSchoolNews,
  ): Promise<string> {
    const schoolPage = await this.schoolReader.getSchoolPageBy(
      command.schoolPageToken,
    );

    const schoolNews = await this.schoolWriter.save(
      command.toEntity(schoolPage),
    );

    return schoolNews.schoolNewsToken;
  }

  @Transactional()
  async modifySchoolNews(
    command: SchoolCommand.ModifySchoolNews,
  ): Promise<string> {
    const schoolNews = await this.schoolReader.getSchoolNewsBy(
      command.schoolNewsToken,
    );

    schoolNews.changeTitle(command.title);
    schoolNews.changeContent(command.content);

    await this.schoolWriter.update(schoolNews);

    return schoolNews.schoolNewsToken;
  }

  @Transactional()
  async removeSchoolNews(token: string): Promise<void> {
    const schoolNews = await this.schoolReader.getSchoolNewsBy(token);

    await this.schoolWriter.remove(schoolNews);
  }
}
