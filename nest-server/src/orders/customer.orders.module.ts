import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {CustomerOrdersResolver} from './customer.orders.resolver';
import {CustomerOrdersService} from './customer.orders.service';
import {UsersModule} from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        UsersModule,
    ],
    providers: [
        CustomerOrdersResolver,
        CustomerOrdersService,
    ],
})
export class CustomerOrdersModule {
}
