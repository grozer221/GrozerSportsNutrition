import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin.users.service';
import { User } from './user.entity';
import {Role, RoleName} from '../roles/role.entity';
import { GetUsersInput } from './dto/get-users.input';
import {GetUsersResponse} from './dto/get-users.response';
import {Roles} from '../roles/roles.decorators';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';

@Resolver(() => User)
export class AdminUsersResolver {
    constructor(private adminUsersService: AdminUsersService) {
    }

    @ResolveField(() => [Role])
    async roles(@Parent() user: User): Promise<Role[]> {
        return await this.adminUsersService.getRolesByUserIdAsync(user.id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => GetUsersResponse)
    async getUsers(
        @Args('getUsersInput', { type: () => GetUsersInput }) getUsersInput: GetUsersInput,
    ): Promise<GetUsersResponse> {
        return await this.adminUsersService.getAsync(getUsersInput.take, getUsersInput.skip);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => User)
    async getUser(
        @Args('email', { type: () => String }) email: string,
    ): Promise<User> {
        return await this.adminUsersService.getByEmailAsync(email);
    }
}
