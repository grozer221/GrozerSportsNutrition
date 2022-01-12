import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin.users.service';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { GetUsersInput } from './dto/get-users.input';

@Resolver(() => User)
export class AdminUsersResolver {
    constructor(private adminUsersService: AdminUsersService) {
    }

    @ResolveField(() => [Role])
    async roles(@Parent() user: User): Promise<Role[]> {
        return await this.adminUsersService.getRolesByUserIdAsync(user.id);
    }

    @Query(() => [User])
    async getUsers(
        @Args('getUsersInput', { type: () => GetUsersInput }) getUsersInput: GetUsersInput,
    ): Promise<User[]> {
        return await this.adminUsersService.getAsync(getUsersInput.take, getUsersInput.skip);
    }

    @Query(() => User)
    async getUser(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return await this.adminUsersService.getByIdAsync(id);
    }
}
