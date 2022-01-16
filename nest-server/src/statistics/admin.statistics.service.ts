import {Injectable} from '@nestjs/common';
import {OrderStatistics} from './order-statistics.entity';
import {ProfitStatistics} from './profit-statistics.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from '../orders/order.entity';
import {Repository} from 'typeorm';
import {ProductInOrder} from '../orders/product-in-order.entity';

@Injectable()
export class AdminStatisticsService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(ProductInOrder) private productInOrderRepository: Repository<ProductInOrder>,
    ) {
    }

    async getOrdersStatistics(): Promise<OrderStatistics[]> {
        const orders = await this.ordersRepository.find({order: {createdAt: 'ASC'}});
        let ordersStatistics: OrderStatistics[] = [];
        for (const order of orders) {
            if (ordersStatistics.some(orderStatistics => orderStatistics.date === order.createdAt.toLocaleDateString())) {
                ordersStatistics = ordersStatistics.map(orderStatistics =>
                    orderStatistics.date === order.createdAt.toLocaleDateString()
                        ? {...orderStatistics, ordersCount: orderStatistics.ordersCount + 1}
                        : orderStatistics,
                );
            } else {
                ordersStatistics.push({
                    date: order.createdAt.toLocaleDateString(),
                    ordersCount: 1,
                });
            }
        }
        return ordersStatistics;
    }

    async getProfitStatistics(): Promise<ProfitStatistics[]> {
        const orders = await this.ordersRepository.find({order: {createdAt: 'ASC'}});
        let profitStatistics: ProfitStatistics[] = [];
        for (const order of orders) {
            if (profitStatistics.some(orderStatistics => orderStatistics.date === order.createdAt.toLocaleDateString())) {
                profitStatistics = profitStatistics.map(profitStatistics =>
                    profitStatistics.date === order.createdAt.toLocaleDateString()
                        ? {...profitStatistics, totalPrice: profitStatistics.totalPrice + order.totalPrice}
                        : profitStatistics,
                );
            } else {
                profitStatistics.push({
                    date: order.createdAt.toLocaleDateString(),
                    totalPrice: order.totalPrice,
                });
            }
        }
        return profitStatistics;
    }
}
