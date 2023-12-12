import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export namespace SchoolDto {
  export class RequestRegisterSchoolPage {
    @Expose()
    @IsNotEmpty()
    readonly region: string;

    @Expose()
    @IsNotEmpty()
    readonly schoolName: string;
  }

  export class ResponseRegisterSchoolPage {
    @Expose()
    readonly schoolPageToken: string;
  }
}
