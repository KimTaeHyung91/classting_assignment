import { ClassConstructor, plainToInstance } from 'class-transformer';
import { StudentInfo } from './student.info';
import { SchoolPageEntity } from '../../school/domain/school-page.entity';
import { SchoolNewsEntity } from '../../school/domain/news/school-news.entity';

export namespace StudentMapper {
  export function of(
    cls: ClassConstructor<StudentInfo.SubscribeInfo>,
    target: SchoolPageEntity,
  ): StudentInfo.SubscribeInfo;

  export function of(
    cls: ClassConstructor<StudentInfo.SubscribeNews>,
    target: SchoolNewsEntity,
  ): StudentInfo.SubscribeNews;

  export function of(cls: any, target: any): any {
    return plainToInstance(cls, target, {
      excludeExtraneousValues: true,
    });
  }
}
