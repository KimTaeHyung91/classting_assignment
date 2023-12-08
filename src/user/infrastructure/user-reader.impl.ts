import { IUserReader } from '../domain/user-reader.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class UserReaderImpl implements IUserReader {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ email }).catch(() => {
      throw new EntityNotFoundError(UserEntity, email);
    });
  }
}
