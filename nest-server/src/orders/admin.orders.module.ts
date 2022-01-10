import {Module} from '@nestjs/common';
import {AdminOrdersService} from './admin.orders.service';
import {AdminOrdersResolver} from './admin.orders.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './order.entity';
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
        AdminOrdersResolver,
        AdminOrdersService,
    ],
})
export class AdminOrdersModule {
}
