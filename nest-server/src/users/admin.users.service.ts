import {Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {RegisterInput} from '../auth/dto/register.input';
import {Role, RoleName} from '../roles/role.entity';
import {AdminRolesService} from '../roles/admin.roles.service';
import {rolesConstants} from '../roles/roles.constants';
import {UpdateMeInput} from '../auth/dto/update-me.input';
import {UpdateEmailInput} from '../auth/dto/update-email.input';
import {hashPassword} from '../utils/hashPassword';
import {GetUsersResponse} from './dto/get-users.response';
import {UpdateUserInput} from './dto/update-user.input';
import {GetUsersInput} from './dto/get-users.input';
import {ordersConstants} from '../orders/orders.constants';
import {Order} from '../orders/order.entity';

@Injectable()
export class AdminUsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly rolesService: AdminRolesService,
    ) {
    }

    async addAsync(registerInput: RegisterInput): Promise<User> {
        const customerRole = await this.rolesService.getByNameAsync(RoleName.customer);
        const user = this.usersRepository.create(registerInput);
        user.roles = [customerRole];
        return await this.usersRepository.save(user);
    }

    async getAsync(getUsersInput: GetUsersInput): Promise<GetUsersResponse> {
        const getUsersResponse = new GetUsersResponse();
        const [users, usersCount] = await this.usersRepository.findAndCount({
            where: [
                {id: Like(`%${getUsersInput.like}%`)},
                {email: Like(`%${getUsersInput.like}%`)},
                {firstName: Like(`%${getUsersInput.like}%`)},
                {lastName: Like(`%${getUsersInput.like}%`)},
            ],
            take: getUsersInput.take,
            skip: getUsersInput.skip,
            order: {createdAt: 'DESC'},
        });
        getUsersResponse.users = users;
        getUsersResponse.total = usersCount;
        return getUsersResponse;
    }

    async getByIdAsync(id: number): Promise<User> {
        return await this.usersRepository.findOneOrFail(id);
    }

    async getRolesByUserIdAsync(id: number): Promise<Role[]> {
        const user = await this.usersRepository.findOneOrFail(id, {
            relations: [rolesConstants.tableName],
        });
        return user.roles;
    }

    async getByEmailAsync(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: {email},
        });
    }

    async getByEmailWithRolesAsync(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            relations: [rolesConstants.tableName],
            where: {email},
        });
    }

    async confirmEmailAsync(email: string): Promise<User> {
        const user = await this.getByEmailWithRolesAsync(email);
        if (user.confirmedEmail)
            throw new Error('Email already confirmed');
        user.confirmedEmail = true;
        return await this.usersRepository.save(user);
    }

    async updateAsync(updateUserInput: UpdateUserInput): Promise<User> {
        return await this.usersRepository.save(updateUserInput);
    }

    async updateByIdAsync(userId: number, updateMeInput: UpdateMeInput): Promise<User> {
        const user = await this.getByIdAsync(userId);
        return await this.usersRepository.save({...user, ...updateMeInput});
    }

    async updateEmailByIdAsync(userId: number, updateEmailInput: UpdateEmailInput): Promise<User> {
        const user = await this.getByIdAsync(userId);
        return await this.usersRepository.save({...user, ...updateEmailInput, confirmedEmail: false});
    }

    async updatePasswordByIdAsync(userId: number, password: string) {
        const user = await this.getByIdAsync(userId);
        const hashedPassword = await hashPassword(password);
        return await this.usersRepository.save({...user, password: hashedPassword});
    }

    async removeAsync(email: string) {
        const user = await this.getByEmailAsync(email);
        return await this.usersRepository.remove(user);
    }

    async getOrdersByUserIdAsync(userId: number): Promise<Order[]> {
        const user = await this.usersRepository.findOneOrFail(userId, {
            relations: [ordersConstants.tableName],
        });
        return user.orders;
    }
}
