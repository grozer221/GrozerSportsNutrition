import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {CustomerProductsResolver} from './customer.products.resolver';
import {CustomerProductsService} from './customer.products.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    providers: [
        CustomerProductsResolver,
        CustomerProductsService,
    ],
})
export class CustomerProductsModule {
}
