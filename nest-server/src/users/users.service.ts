import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User) private usersRepository: Repository<User>,
    ) {
    }

    async register(registerUserInput: RegisterUserInput): Promise<User> {
        const user = this.usersRepository.create(registerUserInput);
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOneOrFail(id);
    }
}
