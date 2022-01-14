import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Category} from './category.entity';
import {CustomerCategoriesService} from './customer.categories.service';
import {CustomerCategoriesResolver} from './customer.categories.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
    ],
    providers: [
        CustomerCategoriesResolver,
        CustomerCategoriesService,
    ],
})
export class CustomerCategoriesModule {
}
