import { StudentDto } from './student.dto';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { StudentCommand } from '../domain/student.command';
import { StudentSearch } from '../domain/student.search';
import { StudentInfo } from '../domain/student.info';

export namespace StudentDtoMapper {
  export function of(
    cls: ClassConstructor<StudentCommand.RegisterStudent>,
    target: StudentDto.RequestRegisterStudent,
  ): StudentCommand.RegisterStudent;

  export function of(
    cls: ClassConstructor<StudentCommand.SubscribeSchoolPage>,
    target: StudentDto.RequestSubscribeSchoolPage,
  ): StudentCommand.SubscribeSchoolPage;

  export function of(
    cls: ClassConstructor<StudentCommand.CancelSubscribeSchoolPage>,
    target: StudentDto.RequestCancelSubscribeSchoolPage,
  ): StudentCommand.CancelSubscribeSchoolPage;

  export function of(
    cls: ClassConstructor<StudentDto.ResponseStudentToken>,
    target: Record<string, any>,
  ): StudentDto.ResponseStudentToken;

  export function of(
    cls: ClassConstructor<StudentSearch.RetrieveNewsBySubscribeSchoolPageSearch>,
    target: StudentDto.QueryRetrieveNewsBySubscribeSchoolPage,
  ): StudentSearch.RetrieveNewsBySubscribeSchoolPageSearch;

  export function of(
    cls: ClassConstructor<StudentSearch.RetrieveSubscribeSchoolPageListSearch>,
    target: StudentDto.QueryRetrieveSubscribeSchoolPageList,
  ): StudentSearch.RetrieveSubscribeSchoolPageListSearch;

  export function of(
    cls: ClassConstructor<StudentDto.SubscribeMain>,
    target: StudentInfo.SubscribeInfo,
  ): StudentDto.SubscribeMain;

  export function of(
    cls: ClassConstructor<StudentDto.SubscribeSchoolNewsMain>,
    target: StudentInfo.SubscribeNews,
  ): StudentDto.SubscribeSchoolNewsMain;

  export function of(cls: any, target: any): any {
    return plainToInstance(cls, target, {
      excludeExtraneousValues: true,
    });
  }
}
