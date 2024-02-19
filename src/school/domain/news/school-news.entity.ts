import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TOfConstructor } from '../../../base/type/mutable.type';
import { StringUtil } from '../../../util/string.util';
import { SchoolPageEntity } from '../school-page.entity';
import { LocalDateTime } from '@js-joda/core';
import { DateUtil } from '../../../util/date.util';
import { BaseTimeEntity } from '../../../base/entity/base-time.entity';

@Entity('school_news')
@Index('school_news_idx_01', ['schoolNewsToken'])
export class SchoolNewsEntity extends BaseTimeEntity<SchoolNewsEntity> {
  @Column()
  readonly schoolNewsToken: string;

  @Column()
  readonly title: string;

  @Column()
  readonly content: string;

  @ManyToOne(() => SchoolPageEntity, {
    createForeignKeyConstraints: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'school_page_id' })
  readonly schoolPage: SchoolPageEntity;

  static of(props: Omit<TOfConstructor<SchoolNewsEntity>, 'schoolPage'>) {
    const _this = new this();

    _this.mutable({
      schoolNewsToken: StringUtil.generateUUID(),
      title: props.title,
      content: props.content,
    });

    return _this;
  }

  setSchoolPage(schoolPage: SchoolPageEntity) {
    this.mutable({ schoolPage });
  }

  changeTitle(title: string) {
    if (title) {
      this.mutable({ title });
    }
  }

  changeContent(content: string) {
    if (content) {
      this.mutable({ content });
    }
  }

  setDeletedAt(deletedAt: LocalDateTime) {
    const date = DateUtil.toDate(deletedAt);
    this.mutable({ deletedAt: date });
  }
}
