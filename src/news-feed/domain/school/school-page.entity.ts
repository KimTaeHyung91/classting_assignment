import { BaseEntity } from '../../../base/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OfMutableType } from '../../../base/type/mutable.type';
import { RandomStringUtil } from '../../../util/random-string.util';

@Entity('school_page')
export class SchoolPageEntity extends BaseEntity<SchoolPageEntity> {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly schoolPageToken: string;

  @Column()
  readonly region: string;

  @Column()
  readonly schoolName: string;

  private constructor(
    schoolPageToken: string,
    region: string,
    schoolName: string,
  ) {
    super();
    this.schoolPageToken = schoolPageToken;
    this.region = region;
    this.schoolName = schoolName;
  }

  static of(props: OfMutableType<SchoolPageEntity>) {
    return new this(
      RandomStringUtil.generate(),
      props.region,
      props.schoolName,
    );
  }
}
