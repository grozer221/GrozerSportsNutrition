import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Order} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {CustomerOrdersService} from './customer.orders.service';
import {CurrentUser} from '../auth/auth.decorators';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {User} from '../users/user.entity';
import {ProductInOrder} from './product-in-order.entity';
import {GetOrdersInput} from './dto/get-orders.input';
import {GetOrdersResponse} from './dto/get-orders.response';

@Resolver(() => Order)
export class CustomerOrdersResolver {
    constructor(
        private readonly customerOrdersService: CustomerOrdersService,
    ) {
    }

    @ResolveField(() => [ProductInOrder])
    async productsInOrder(@Parent() order: Order): Promise<ProductInOrder[]> {
        return await this.customerOrdersService.getProductsInOrderByOrderIdAsync(order.id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Order)
    async getMyOrderById(
        @Args('id', {type: () => Int}) id: number,
        @CurrentUser() currentUser: User,
    ): Promise<Order> {
        return await this.customerOrdersService.getMyById(id, currentUser);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => GetOrdersResponse)
    async getMyOrders(
        @Args('getOrdersInput', {type: () => GetOrdersInput}) getOrdersInput: GetOrdersInput,
        @CurrentUser() currentUser: User,
    ): Promise<GetOrdersResponse> {
        return await this.customerOrdersService.getMy(getOrdersInput, currentUser);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Order)
    async createOrder(
        @Args('createOrderInput', {type: () => CreateOrderInput}) createOrderInput: CreateOrderInput,
        @CurrentUser() currentUser: User,
    ): Promise<Order> {
        return await this.customerOrdersService.createAsync(createOrderInput, currentUser);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Order)
    async cancelOrder(
        @Args('id', {type: () => Int}) id: number,
        @CurrentUser() currentUser: User,
    ): Promise<Order> {
        return await this.customerOrdersService.cancelAsync(id, currentUser.id);
    }


}
