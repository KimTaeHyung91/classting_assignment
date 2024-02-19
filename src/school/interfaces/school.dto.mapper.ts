import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SchoolDto } from './school.dto';
import { SchoolCommand } from '../domain/school.command';

export namespace SchoolDtoMapper {
  export function of(
    cls: ClassConstructor<SchoolCommand.CreateSchoolPage>,
    target: SchoolDto.RequestCreateSchoolPage,
  ): SchoolCommand.CreateSchoolPage;

  export function of(
    cls: ClassConstructor<SchoolCommand.CreateSchoolNews>,
    target: SchoolDto.RequestCreateSchoolNews,
  ): SchoolCommand.CreateSchoolNews;

  export function of(
    cls: ClassConstructor<SchoolCommand.ModifySchoolNews>,
    target: SchoolDto.RequestModifySchoolNews,
  ): SchoolCommand.ModifySchoolNews;

  export function of(
    cls: ClassConstructor<SchoolDto.ResponseSchoolPageToken>,
    target: Record<string, any>,
  ): SchoolDto.ResponseSchoolPageToken;

  export function of(
    cls: ClassConstructor<SchoolDto.ResponseSchoolNewsToken>,
    target: Record<string, any>,
  ): SchoolDto.ResponseSchoolNewsToken;

  export function of(cls: any, target: any): any {
    return plainToInstance(cls, target, {
      excludeExtraneousValues: true,
    });
  }
}
