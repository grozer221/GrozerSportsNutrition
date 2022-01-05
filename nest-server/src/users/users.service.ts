import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from '../auth/dto/register.input';
import { Role, RoleName } from '../roles/role.entity';
import { RolesService } from '../roles/roles.service';
import { rolesConstants } from '../roles/roles.constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly rolesService: RolesService,
    ) {
    }

    async addAsync(registerInput: RegisterInput): Promise<User> {
        const customerRole = await this.rolesService.getByNameAsync(RoleName.customer);
        const user = this.usersRepository.create(registerInput);
        user.roles = [customerRole];
        return await this.usersRepository.save(user);
    }

    async getAsync(take: number, skip: number): Promise<User[]> {
        return await this.usersRepository.find({ take, skip });
    }

    async getByIdAsync(id: number): Promise<User> {
        return await this.usersRepository.findOneOrFail(id);
    }

    async getRolesByUserId(id: number): Promise<Role[]> {
        const user = await this.usersRepository.findOneOrFail(id, {
            relations: [rolesConstants.tableName],
        });
        return user.roles;
    }

    async getByEmailAsync(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: { email },
        });
    }

    async getByEmailWithRolesAsync(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            relations: [rolesConstants.tableName],
            where: { email },
        });
    }

    async confirmEmail(email: string): Promise<User> {
        const user = await this.getByEmailWithRolesAsync(email);
        if (user.confirmedEmail)
            throw new Error('Email already confirmed');
        user.confirmedEmail = true;
        return await this.usersRepository.save(user);
    }
}
