import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { User } from '../users/user.entity';
import { GetRolesInput } from './dto/get-roles.input';

@Resolver(() => Role)
export class RolesResolver {
    constructor(private readonly rolesService: RolesService) {
    }

    @ResolveField(returns => [Role])
    async users(@Parent() role: Role): Promise<User[]> {
        return await this.rolesService.getUsersByRoleIdAsync(role.id);
    }

    @Query(() => [Role])
    async roles(
        @Args('getRolesInput', { type: () => GetRolesInput }) getRolesInput: GetRolesInput,
    ) {
        return await this.rolesService.getAsync(getRolesInput.take, getRolesInput.skip);
    }

    @Query(() => Role)
    async role(@Args('id', { type: () => Int }) id: number) {
        return await this.rolesService.getByIdAsync(id);
    }
}
