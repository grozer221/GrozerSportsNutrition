import {Module} from '@nestjs/common';
import {AdminOrdersService} from './admin.orders.service';
import {AdminOrdersResolver} from './admin.orders.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {UsersModule} from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        UsersModule,
    ],
    providers: [
        AdminOrdersResolver,
        AdminOrdersService,
    ],
})
export class AdminOrdersModule {
}
