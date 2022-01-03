import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { Roles } from '../roles/roles.decorators';
import { RoleName } from '../roles/role.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetOrdersInput } from './dto/get-orders.input';
import { GetOrdersResponse } from './dto/get-orders.response';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrdersResolver {
    constructor(
        private readonly ordersService: OrdersService,
    ) {
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => GetOrdersResponse)
    async getOrders(
        @Args('getOrdersInput', { type: () => GetOrdersInput }) getOrdersInput: GetOrdersInput,
    ): Promise<GetOrdersResponse> {
        return await this.ordersService.getAsync(getOrdersInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => Order)
    async getOrder(@Args('id', { type: () => Int }) id: number): Promise<Order> {
        return await this.ordersService.getByIdAsync(id);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Order)
    async createOrder(
        @Args('createOrderInput', { type: () => CreateOrderInput }) createOrderInput: CreateOrderInput,
    ): Promise<Order> {
        return await this.ordersService.createAsync(createOrderInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Order)
    async updateOrder(
        @Args('updateOrderInput', { type: () => UpdateOrderInput }) updateOrderInput: UpdateOrderInput,
    ): Promise<Order> {
        return await this.ordersService.updateAsync(updateOrderInput);
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async removeOrder(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        await this.ordersService.removeAsync(id);
        return true;
    }
}
