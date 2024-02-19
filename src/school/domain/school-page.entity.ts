import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TOfConstructor } from '../../base/type/mutable.type';
import { StringUtil } from '../../util/string.util';
import { SchoolNewsEntity } from './news/school-news.entity';
import { BaseTimeEntity } from '../../base/entity/base-time.entity';

@Entity('school_page')
@Index('school_page_idx_01', ['schoolPageToken'])
export class SchoolPageEntity extends BaseTimeEntity<SchoolPageEntity> {
  @Column()
  readonly schoolPageToken: string;

  @Column()
  readonly schoolName: string;

  @Column()
  readonly location: string;

  @OneToMany(() => SchoolNewsEntity, (schoolNews) => schoolNews.schoolPage, {
    cascade: ['insert', 'update'],
  })
  readonly schoolNewsList: Promise<Array<SchoolNewsEntity>>;

  static of(props: TOfConstructor<SchoolPageEntity>) {
    const _this = new this();

    _this.mutable({
      schoolPageToken: StringUtil.generateUUID(),
      location: props.location,
      schoolName: props.schoolName,
    });

    return _this;
  }

  async lazyLoadSchoolNews(): Promise<Array<SchoolNewsEntity>> {
    return await this.schoolNewsList;
  }
}
