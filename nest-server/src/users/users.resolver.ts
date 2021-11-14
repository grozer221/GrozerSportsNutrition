import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RegisterInput } from '../auth/dto/register.input';

@Resolver(of => User)
export class UsersResolver {
    constructor(private userService: UsersService) {
    }

    // @ResolveField(returns => Role)
    // roles(@Parent() user: User): Promise<Role> {
    //     return this.userService.getRole(user.roleId);
    // }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Query(returns => User)
    async user(
      @Args('id', { type: () => Int }) id: number
    ): Promise<User> {
        return await this.userService.findOne(id);
    }

    // @Mutation(returns => User)
    // register(
    //   @Args('registerUserInput') registerUserInput: RegisterInput
    // ): Promise<User> {
    //     return this.userService.register(registerUserInput);
    // }
}
