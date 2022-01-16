import {Module} from '@nestjs/common';
import {AdminStatisticsService} from './admin.statistics.service';
import {AdminStatisticsResolver} from './admin.statistics.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from '../orders/order.entity';
import {ProductInOrder} from '../orders/product-in-order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        TypeOrmModule.forFeature([ProductInOrder]),
    ],
    providers: [
        AdminStatisticsResolver,
        AdminStatisticsService],
})
export class AdminStatisticsModule {
}
