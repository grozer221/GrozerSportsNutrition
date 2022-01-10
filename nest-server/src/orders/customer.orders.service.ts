import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';
import {ProductInOrder} from './product-in-order.entity';
import {AdminProductsService} from '../products/admin.products.service';

@Injectable()
export class CustomerOrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(ProductInOrder) private productInOrderRepository: Repository<ProductInOrder>,
        private readonly usersService: UsersService,
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
            totalPrice += product.priceUAH;
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
}
