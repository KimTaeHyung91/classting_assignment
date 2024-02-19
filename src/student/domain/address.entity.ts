import { Column } from 'typeorm';
import { BaseEntity } from '../../base/entity/base.entity';
import { TOfConstructor } from '../../base/type/mutable.type';

export class AddressEntity extends BaseEntity<AddressEntity> {
  @Column({ nullable: true })
  readonly city: string;

  @Column({ nullable: true })
  readonly roadAddress: string;

  @Column({ nullable: true })
  readonly numberingAddress: string;

  static of(props: TOfConstructor<AddressEntity>) {
    const _this = new this();

    _this.mutable({
      city: props.city,
      roadAddress: props.roadAddress,
      numberingAddress: props.numberingAddress,
    });

    return _this;
  }
}
