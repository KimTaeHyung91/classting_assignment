import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateUtil } from '../../util/date.util';
import { LocalDateTime } from '@js-joda/core';
import { BaseEntity } from './base.entity';

export abstract class BaseTimeEntity<T> extends BaseEntity<T> {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  readonly deletedAt: Date;

  @BeforeInsert()
  protected beforeInsert() {
    (this.createdAt as any) = DateUtil.toDate(LocalDateTime.now());
    (this.updatedAt as any) = DateUtil.toDate(LocalDateTime.now());
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    (this.updatedAt as any) = DateUtil.toDate(LocalDateTime.now());
  }
}
