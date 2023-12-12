import { SchoolPageEntity } from './school-page.entity';
import { Expose } from 'class-transformer';

export namespace SchoolCommand {
  export class RegisterSchoolPage {
    @Expose()
    readonly region: string;

    @Expose()
    readonly schoolName: string;

    toEntity(): SchoolPageEntity {
      return SchoolPageEntity.of({
        region: this.region,
        schoolName: this.schoolName,
      });
    }
  }
}
