import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '../../base/entity/base-time.entity';
import { StudentEntity } from './student.entity';
import { SchoolPageEntity } from '../../school/domain/school-page.entity';
import { StudentEnum } from './enum/student.enum';
import { TOfConstructor } from '../../base/type/mutable.type';
import { DateUtil } from '../../util/date.util';
import { LocalDateTime } from '@js-joda/core';

@Entity('student_school_page')
export class StudentSchoolPageEntity extends BaseTimeEntity<StudentSchoolPageEntity> {
  @ManyToOne(() => StudentEntity, {
    createForeignKeyConstraints: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  readonly student: StudentEntity;

  @ManyToOne(() => SchoolPageEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'school_page_id' })
  readonly schoolPage: SchoolPageEntity;

  @Column({ nullable: true })
  readonly subscribeAt: Date;

  @Column({ nullable: true })
  readonly cancelSubscribeAt: Date;

  @Column({ type: 'enum', enum: StudentEnum.SubscribeStatus })
  readonly subscribeStatus: StudentEnum.SubscribeStatus;

  static of(
    props: Pick<
      TOfConstructor<StudentSchoolPageEntity>,
      'student' | 'schoolPage'
    >,
  ) {
    const _this = new this();

    _this.mutable({
      student: props.student,
      schoolPage: props.schoolPage,
      subscribeAt: DateUtil.toDate(LocalDateTime.now()),
      subscribeStatus: StudentEnum.SubscribeStatus.ACTIVE,
    });

    return _this;
  }

  setCancelSubscribeAt(cancelSubscribeAt: LocalDateTime) {
    this.mutable({ cancelSubscribeAt: DateUtil.toDate(cancelSubscribeAt) });
  }

  changeInActive() {
    this.mutable({ subscribeStatus: StudentEnum.SubscribeStatus.IN_ACTIVE });
  }
}
