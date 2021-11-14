import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from '../auth/dto/register.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {
    }

    async add(registerInput: RegisterInput): Promise<User> {
        const user = this.usersRepository.create(registerInput);
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOneOrFail(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({
            where: { email },
        });
    }
}
