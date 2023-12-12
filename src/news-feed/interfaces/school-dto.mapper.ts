import { SchoolCommand } from '../domain/school/school.command';
import { SchoolDto } from './school.dto';
import { ClassConstructor } from 'class-transformer';
import { ClassTransformUtil } from '../../util/class-transform.util';

type ClsType =
  | ClassConstructor<SchoolCommand.RegisterSchoolPage>
  | ClassConstructor<SchoolDto.ResponseRegisterSchoolPage>;

type TargetType = SchoolDto.RequestRegisterSchoolPage | Record<string, any>;

type ReturnType =
  | SchoolCommand.RegisterSchoolPage
  | SchoolDto.ResponseRegisterSchoolPage;

export namespace SchoolDtoMapper {
  export function of(
    cls: ClassConstructor<SchoolCommand.RegisterSchoolPage>,
    target: SchoolDto.RequestRegisterSchoolPage,
  ): SchoolCommand.RegisterSchoolPage;

  export function of(
    cls: ClassConstructor<SchoolDto.ResponseRegisterSchoolPage>,
    target: Record<string, any>,
  ): SchoolDto.ResponseRegisterSchoolPage;

  export function of(cls: ClsType, target: TargetType): ReturnType {
    return ClassTransformUtil.excludeConvertTo(cls, target);
  }
}
