import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Role, RoleName} from './role.entity';
import {User} from '../users/user.entity';
import {usersConstants} from '../users/users.constants';

@Injectable()
export class AdminRolesService {
    constructor(
        @InjectRepository(Role) private rolesRepository: Repository<Role>,
    ) {
    }

    async getAsync(): Promise<Role[]> {
        return await this.rolesRepository.find();
    }

    async getByIdAsync(id: number): Promise<Role> {
        return await this.rolesRepository.findOneOrFail(id);
    }

    async getUsersByRoleIdAsync(id: number): Promise<User[]> {
        const role = await this.rolesRepository.findOneOrFail(id, {
            relations: [usersConstants.tableName],
        });
        return role.users;
    }

    async getByNameAsync(name: RoleName): Promise<Role> {
        return await this.rolesRepository.findOneOrFail({
            where: {name},
        });
    }
}
