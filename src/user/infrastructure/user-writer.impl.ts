import { IUserWriter } from '../domain/user-writer.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserWriterImpl implements IUserWriter {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(entity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(entity);
  }
}
