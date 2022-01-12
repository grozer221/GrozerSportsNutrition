import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Order, OrderStatus} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {User} from '../users/user.entity';
import {AdminUsersService} from '../users/admin.users.service';
import {ProductInOrder} from './product-in-order.entity';
import {AdminProductsService} from '../products/admin.products.service';
import {GetOrdersInput} from './dto/get-orders.input';
import {GetOrdersResponse} from './dto/get-orders.response';

@Injectable()
export class CustomerOrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(ProductInOrder) private productInOrderRepository: Repository<ProductInOrder>,
        private readonly usersService: AdminUsersService,
        private readonly adminProductsService: AdminProductsService,
    ) {
    }

    async createAsync(createOrderInput: CreateOrderInput, currentUser: User): Promise<Order> {
        let order = this.ordersRepository.create({...createOrderInput, userId: currentUser.id});
        order = await this.ordersRepository.save(order);
        let totalPrice = 0;
        for (const key in createOrderInput.createProductInOrder) {
            const createProductInOrder = this.productInOrderRepository.create(createOrderInput.createProductInOrder[key]);
            createProductInOrder.orderId = order.id;
            await this.productInOrderRepository.save(createProductInOrder);

            const product = await this.adminProductsService.getByIdAsync(createProductInOrder.productId);
            totalPrice += product.priceUAH * createOrderInput.createProductInOrder[key].productQuantity;
        }
        order.totalPrice = totalPrice;
        order = await this.ordersRepository.save(order);
        return order;
    }

    async getProductsInOrderByOrderIdAsync(orderId: number): Promise<ProductInOrder[]> {
        const productsInOrder: ProductInOrder[] = await this.productInOrderRepository.find({
            where: {orderId: orderId},
        });
        for (const key in productsInOrder)
            productsInOrder[key].product = await this.adminProductsService.getByIdAsync(productsInOrder[key].productId);
        return productsInOrder;
    }

    async getMy(getOrdersInput: GetOrdersInput, currentUser: User): Promise<GetOrdersResponse> {
        const orders = await this.ordersRepository.find({
            where: {userId: currentUser.id},
            take: getOrdersInput.take,
            skip: getOrdersInput.skip,
            order: {
                createdAt: 'DESC',
            },

        });
        const ordersCount = await this.ordersRepository.find({where: {userId: currentUser.id}});
        const getOrdersResponse = new GetOrdersResponse();
        getOrdersResponse.orders = orders;
        getOrdersResponse.total = ordersCount.length;
        return getOrdersResponse;
    }

    async getMyById(orderId: number, currentUser: User): Promise<Order> {
        return await this.ordersRepository.findOneOrFail(orderId, {
            where: {userId: currentUser.id},
        });
    }

    async getByIdAsync(id: number): Promise<Order> {
        return await this.ordersRepository.findOneOrFail(id);
    }

    async cancelAsync(orderId: number, userId: number): Promise<Order> {
        const order = await this.getByIdAsync(orderId);
        if (order.userId !== userId)
            throw new Error('You can not cancel not your order');

        if (order.orderStatus !== OrderStatus.new)
            throw new Error('You can not cancel order which is not new');

        order.orderStatus = OrderStatus.canceled;
        return await this.ordersRepository.save(order);
    }
}
