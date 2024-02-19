import { Expose } from 'class-transformer';
import { AddressEntity } from './address.entity';
import { StudentEntity } from './student.entity';
import { SchoolPageEntity } from '../../school/domain/school-page.entity';
import { StudentSchoolPageEntity } from './student-school-page.entity';

export namespace StudentCommand {
  export class RegisterStudent {
    @Expose()
    readonly studentName: string;

    @Expose()
    readonly age: number;

    @Expose()
    readonly city: string;

    @Expose()
    readonly roadAddress: string;

    @Expose()
    readonly numberingAddress: string;

    toEntity() {
      const address = AddressEntity.of({
        city: this.city,
        roadAddress: this.roadAddress,
        numberingAddress: this.numberingAddress,
      });

      return StudentEntity.of({
        studentName: this.studentName,
        age: this.age,
        address,
      });
    }
  }

  export class SubscribeSchoolPage {
    @Expose()
    readonly schoolPageToken: string;

    @Expose()
    readonly studentToken: string;

    toEntity(student: StudentEntity, schoolPage: SchoolPageEntity) {
      return StudentSchoolPageEntity.of({
        student,
        schoolPage,
      });
    }
  }

  export class CancelSubscribeSchoolPage {
    @Expose()
    readonly schoolPageToken: string;

    @Expose()
    readonly studentToken: string;
  }
}
