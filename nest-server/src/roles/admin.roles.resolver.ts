import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AdminRolesService } from './admin.roles.service';
import {Role, RoleName} from './role.entity';
import { User } from '../users/user.entity';
import { GetRolesInput } from './dto/get-roles.input';
import {Roles} from './roles.decorators';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';

@Resolver(() => Role)
export class AdminRolesResolver {
    constructor(private readonly rolesService: AdminRolesService) {
    }

    @ResolveField(() => [Role])
    async users(@Parent() role: Role): Promise<User[]> {
        return await this.rolesService.getUsersByRoleIdAsync(role.id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [Role])
    async getRoles() {
        return await this.rolesService.getAsync();
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Role)
    async getRole(@Args('id', { type: () => Int }) id: number) {
        return await this.rolesService.getByIdAsync(id);
    }
}
