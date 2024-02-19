import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PageRequest } from '../../base/page/page-request';

export namespace StudentDto {
  export class RequestRegisterStudent {
    @Expose()
    @IsNotEmpty()
    readonly studentName: string;

    @Expose()
    @IsNotEmpty()
    readonly age: number;

    @Expose()
    @IsOptional()
    readonly city: string;

    @Expose()
    @IsOptional()
    readonly roadAddress: string;

    @Expose()
    @IsOptional()
    readonly numberingAddress: string;
  }

  export class RequestSubscribeSchoolPage {
    @Expose()
    @IsNotEmpty()
    readonly schoolPageToken: string;

    @Expose()
    @IsNotEmpty()
    readonly studentToken: string;
  }

  export class RequestCancelSubscribeSchoolPage {
    @Expose()
    @IsNotEmpty()
    readonly schoolPageToken: string;

    @Expose()
    @IsNotEmpty()
    readonly studentToken: string;
  }

  export class SubscribeMain {
    @Expose()
    readonly schoolName: string;

    @Expose()
    readonly location: string;
  }

  export class SubscribeSchoolNewsMain {
    @Expose()
    readonly createdAt: string;

    @Expose()
    readonly title: string;

    @Expose()
    readonly content: string;
  }

  export class ResponseStudentToken {
    @Expose()
    readonly studentToken: string;
  }

  export class QueryRetrieveSubscribeSchoolPageList extends PageRequest {}

  export class QueryRetrieveNewsBySubscribeSchoolPage extends PageRequest {
    @Expose()
    @IsNotEmpty()
    readonly schoolPageToken: string;
  }

  export class QueryRetrieveStudentListPage extends PageRequest {}
}
