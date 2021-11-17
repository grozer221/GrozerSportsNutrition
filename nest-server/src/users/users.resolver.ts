import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { GetUsersInput } from './dto/get-users.input';

@Resolver(of => User)
export class UsersResolver {
    constructor(private userService: UsersService) {
    }

    @ResolveField(returns => [Role])
    async roles(@Parent() user: User): Promise<Role[]> {
        return await this.userService.getRolesByUserId(user.id);
    }

    @Query(returns => [User])
    async getUsers(
        @Args('getUsersInput', { type: () => GetUsersInput }) getUsersInput: GetUsersInput,
    ): Promise<User[]> {
        return await this.userService.getAsync(getUsersInput.take, getUsersInput.skip);
    }

    @Query(returns => User)
    async getUser(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return await this.userService.getByIdAsync(id);
    }
}
