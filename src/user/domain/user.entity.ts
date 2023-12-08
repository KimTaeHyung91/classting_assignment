import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { UserRole } from '../../base/role/user.role';
import { OfMutableType } from '../../base/type/mutable.type';
import { RandomStringUtil } from '../../util/random-string.util';

@Entity('user')
export class UserEntity extends BaseEntity<UserEntity> {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly userToken: string;

  @Column()
  readonly userName: string;

  @Column()
  readonly email: string;

  @Column()
  readonly password: string;

  @Column({ enum: UserRole, type: 'enum' })
  readonly role: UserRole;

  private constructor(
    userToken: string,
    userName: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    super();
    this.userToken = userToken;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static of(props: Omit<OfMutableType<UserEntity>, 'userToken'>) {
    return new this(
      RandomStringUtil.generate(),
      props.userName,
      props.email,
      props.password,
      props.role,
    );
  }
}
