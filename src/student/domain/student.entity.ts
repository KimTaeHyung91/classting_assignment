import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { BaseTimeEntity } from '../../base/entity/base-time.entity';
import { TOfConstructor } from '../../base/type/mutable.type';
import { StringUtil } from '../../util/string.util';
import { StudentSchoolPageEntity } from './student-school-page.entity';
import { LocalDateTime } from '@js-joda/core';

@Entity('student')
@Index('student_idx_01', ['studentToken'])
export class StudentEntity extends BaseTimeEntity<StudentEntity> {
  @Column()
  readonly studentToken: string;

  @Column()
  readonly studentName: string;

  @Column()
  readonly age: number;

  @Column(() => AddressEntity, {
    prefix: false,
  })
  readonly address: AddressEntity;

  @OneToMany(
    () => StudentSchoolPageEntity,
    (studentSchoolPage) => studentSchoolPage.student,
    { cascade: ['insert', 'update'] },
  )
  readonly studentSchoolPageList: Array<StudentSchoolPageEntity>;

  static of(
    props: Omit<
      TOfConstructor<StudentEntity>,
      'studentToken' | 'studentSchoolPageList'
    >,
  ) {
    const _this = new this();

    _this.mutable({
      studentToken: StringUtil.generateUUID(),
      studentName: props.studentName,
      age: props.age,
      address: props.address,
    });

    return _this;
  }

  findSchoolPage(schoolPageToken: string) {
    const studentSchoolPage = this.studentSchoolPageList.find(
      (studentSchoolPage) =>
        studentSchoolPage.schoolPage.schoolPageToken === schoolPageToken,
    );

    return studentSchoolPage.schoolPage;
  }

  cancelSubscribe(schoolPageToken: string) {
    this.studentSchoolPageList.forEach((studentSchoolPage) => {
      const schoolPage = studentSchoolPage.schoolPage;

      if (schoolPage && schoolPage.schoolPageToken === schoolPageToken) {
        studentSchoolPage.setCancelSubscribeAt(LocalDateTime.now());
        studentSchoolPage.changeInActive();
      }
    });
  }
}
