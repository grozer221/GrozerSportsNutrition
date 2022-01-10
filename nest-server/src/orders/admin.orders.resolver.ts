import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {AdminOrdersService} from './admin.orders.service';
import {Order} from './order.entity';
import {Roles} from '../roles/roles.decorators';
import {RoleName} from '../roles/role.entity';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';
import {GetOrdersInput} from './dto/get-orders.input';
import {GetOrdersResponse} from './dto/get-orders.response';
import {CreateOrderInput} from './dto/create-order.input';
import {UpdateOrderInput} from './dto/update-order.input';
import {User} from '../users/user.entity';
import {ProductInOrder} from './product-in-order.entity';
import {CurrentUser} from '../auth/auth.decorators';

@Resolver(() => Order)
export class AdminOrdersResolver {
    constructor(
        private readonly adminOrdersService: AdminOrdersService,
    ) {
    }

    @ResolveField(() => [ProductInOrder])
    async productsInOrder(@Parent() order: Order): Promise<ProductInOrder[]> {
        return await this.adminOrdersService.getProductsInOrderByOrderIdAsync(order.id);
    }

    @ResolveField(() => User)
    async user(@Parent() order: Order): Promise<User> {
        return await this.adminOrdersService.getUserByOrderIdAsync(order.id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => GetOrdersResponse)
    async getOrders(
        @Args('getOrdersInput', {type: () => GetOrdersInput}) getOrdersInput: GetOrdersInput,
    ): Promise<GetOrdersResponse> {
        return await this.adminOrdersService.getAsync(getOrdersInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Order)
    async getOrder(@Args('id', {type: () => Int}) id: number): Promise<Order> {
        return await this.adminOrdersService.getByIdAsync(id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Order)
    async createOrder(
        @Args('createOrderInput', {type: () => CreateOrderInput}) createOrderInput: CreateOrderInput,
        @CurrentUser() currentUser: User,
    ): Promise<Order> {
        return await this.adminOrdersService.createAsync(createOrderInput, currentUser);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Order)
    async updateOrder(
        @Args('updateOrderInput', {type: () => UpdateOrderInput}) updateOrderInput: UpdateOrderInput,
    ): Promise<Order> {
        return await this.adminOrdersService.updateAsync(updateOrderInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async removeOrder(@Args('id', {type: () => Int}) id: number): Promise<boolean> {
        await this.adminOrdersService.removeAsync(id);
        return true;
    }
}
