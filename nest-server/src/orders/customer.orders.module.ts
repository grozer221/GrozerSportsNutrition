import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {CustomerOrdersResolver} from './customer.orders.resolver';
import {CustomerOrdersService} from './customer.orders.service';
import {UsersModule} from '../users/users.module';
import {ProductInOrder} from './product-in-order.entity';
import {AdminProductsModule} from '../products/admin.products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        TypeOrmModule.forFeature([ProductInOrder]),
        UsersModule,
        AdminProductsModule,
    ],
    providers: [
        CustomerOrdersResolver,
        CustomerOrdersService,
    ],
})
export class CustomerOrdersModule {
}
