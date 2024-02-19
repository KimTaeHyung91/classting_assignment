import { PageRequest } from '../../base/page/page-request';
import { Expose } from 'class-transformer';

export namespace StudentSearch {
  export class RetrieveSubscribeSchoolPageListSearch extends PageRequest {}

  export class RetrieveNewsBySubscribeSchoolPageSearch extends PageRequest {
    @Expose()
    readonly schoolPageToken: string;
  }

  export class RetrieveStudentListSearch extends PageRequest {}
}
