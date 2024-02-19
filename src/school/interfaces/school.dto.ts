import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export namespace SchoolDto {
  export class RequestCreateSchoolPage {
    @Expose()
    @IsNotEmpty()
    readonly schoolName: string;

    @Expose()
    @IsNotEmpty()
    readonly location: string;
  }

  export class RequestCreateSchoolNews {
    @Expose()
    @IsNotEmpty()
    readonly schoolPageToken: string;

    @Expose()
    @IsNotEmpty()
    readonly title: string;

    @Expose()
    @IsNotEmpty()
    readonly content: string;
  }

  export class RequestModifySchoolNews {
    @Expose()
    @IsNotEmpty()
    readonly schoolNewsToken: string;

    @Expose()
    @IsOptional()
    readonly title: string;

    @Expose()
    @IsOptional()
    readonly content: string;
  }

  export class RequestRemoveSchoolNews {
    @Expose()
    @IsNotEmpty()
    readonly schoolNewsToken: string;
  }

  export class ResponseSchoolPageToken {
    @Expose()
    readonly schoolPageToken: string;
  }

  export class ResponseSchoolNewsToken {
    @Expose()
    readonly schoolNewsToken: string;
  }
}
