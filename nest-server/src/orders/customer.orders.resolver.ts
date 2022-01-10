import {Args, Mutation, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {Order} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {CustomerOrdersService} from './customer.orders.service';
import {CurrentUser} from '../auth/auth.decorators';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {User} from '../users/user.entity';
import {ProductInOrder} from './product-in-order.entity';

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
    @Mutation(() => Order)
    async createOrder(
        @Args('createOrderInput', {type: () => CreateOrderInput}) createOrderInput: CreateOrderInput,
        @CurrentUser() currentUser: User,
    ): Promise<Order> {
        return await this.customerOrdersService.createAsync(createOrderInput, currentUser);
    }
}
