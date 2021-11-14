import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RegisterInput } from '../auth/dto/register.input';
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
    async users(
        @Args('getUsersInput', { type: () => GetUsersInput }) getUsersInput: GetUsersInput,
    ): Promise<User[]> {
        return await this.userService.getAsync(getUsersInput.take, getUsersInput.skip);
    }

    @Query(returns => User)
    async user(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return await this.userService.getByIdAsync(id);
    }

    // @Mutation(returns => User)
    // register(
    //   @Args('registerUserInput') registerUserInput: RegisterInput
    // ): Promise<User> {
    //     return this.userService.register(registerUserInput);
    // }
}
