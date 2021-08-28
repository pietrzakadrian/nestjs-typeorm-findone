import { Injectable } from '@nestjs/common';
import CreateUserDto from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async create(userData: CreateUserDto): Promise<UserEntity> {
    const user = await this._userRepository.create(userData);
    return this._userRepository.save(user);
  }

  public async getUserByUsername(username): Promise<UserEntity> {
    return this._userRepository.findOne({ username });
  }

  public async getUserById(payload): Promise<UserEntity> {
    console.log(payload.userId); // 2
    console.log(payload.id); // undefined

    return this._userRepository.findOne(payload.id);
  }
}
