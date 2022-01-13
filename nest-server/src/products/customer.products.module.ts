import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {CustomerProductsResolver} from './customer.products.resolver';
import {CustomerProductsService} from './customer.products.service';
import {ProductInOrder} from '../orders/product-in-order.entity';
import {Order} from '../orders/order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([ProductInOrder]),
        TypeOrmModule.forFeature([Order]),
    ],
    providers: [
        CustomerProductsResolver,
        CustomerProductsService,
    ],
    exports: [
        CustomerProductsService,
    ],
})
export class CustomerProductsModule {
}
