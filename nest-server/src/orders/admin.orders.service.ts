import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {GetOrdersResponse} from './dto/get-orders.response';
import {GetOrdersInput} from './dto/get-orders.input';
import {UpdateOrderInput} from './dto/update-order.input';
import {User} from '../users/user.entity';
import {AdminUsersService} from '../users/admin.users.service';
import {ProductInOrder} from './product-in-order.entity';
import {AdminProductsService} from '../products/admin.products.service';

@Injectable()
export class AdminOrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(ProductInOrder) private productInOrderRepository: Repository<ProductInOrder>,
        private readonly usersService: AdminUsersService,
        private readonly adminProductsService: AdminProductsService,
    ) {
    }

    async createAsync(createOrderInput: CreateOrderInput, currentUser: User): Promise<Order> {
        for (const key in createOrderInput.createProductInOrder) {
            const createProductInOrderInput = createOrderInput.createProductInOrder[key];
            const product = await this.adminProductsService.getByIdAsync(createProductInOrderInput.productId);
            if (product.quantity < createProductInOrderInput.productQuantity)
                throw new Error(`Product ${product.name} out of stock in the amount of ${createProductInOrderInput.productQuantity} units. Available only ${product.quantity}`);
            product.quantity -= createProductInOrderInput.productQuantity;
            await this.adminProductsService.updateAsync(product);
        }

        let order = this.ordersRepository.create({...createOrderInput, userId: currentUser.id});
        order = await this.ordersRepository.save(order);
        let totalPrice = 0;
        for (const key in createOrderInput.createProductInOrder) {
            const createProductInOrder = this.productInOrderRepository.create(createOrderInput.createProductInOrder[key]);
            createProductInOrder.orderId = order.id;
            await this.productInOrderRepository.save(createProductInOrder);

            const product = await this.adminProductsService.getByIdAsync(createOrderInput.createProductInOrder[key].productId);
            totalPrice += product.priceUAH * createOrderInput.createProductInOrder[key].productQuantity;
        }
        order.totalPrice = totalPrice;
        order = await this.ordersRepository.save(order);
        return order;
    }

    async getAsync(getOrdersInput: GetOrdersInput): Promise<GetOrdersResponse> {
        const getOrdersResponse = new GetOrdersResponse();
        const orders = await this.ordersRepository.find({
            take: getOrdersInput.take,
            skip: getOrdersInput.skip,
        });
        const ordersCount = await this.ordersRepository.find();
        getOrdersResponse.orders = orders;
        getOrdersResponse.total = ordersCount.length;
        return getOrdersResponse;
    }

    async getByIdAsync(id: number): Promise<Order> {
        return await this.ordersRepository.findOneOrFail(id);
    }

    async updateAsync(updateOrderInput: UpdateOrderInput): Promise<Order> {


        let order = this.ordersRepository.create({...updateOrderInput});
        let totalPrice = 0;
        const productsInOrder = await this.productInOrderRepository.find({where: {orderId: updateOrderInput.id}});
        console.log(productsInOrder);
        for (const key in productsInOrder)
            await this.productInOrderRepository.remove(productsInOrder[key]);
        for (const key in updateOrderInput.createProductInOrder) {
            const createProductInOrder = this.productInOrderRepository.create(updateOrderInput.createProductInOrder[key]);
            createProductInOrder.orderId = order.id;
            await this.productInOrderRepository.save(createProductInOrder);

            const product = await this.adminProductsService.getByIdAsync(updateOrderInput.createProductInOrder[key].productId);
            totalPrice += product.priceUAH * updateOrderInput.createProductInOrder[key].productQuantity;
        }
        order.totalPrice = totalPrice;
        order = await this.ordersRepository.save(order);
        return order;
    }

    async removeAsync(id: number): Promise<Order> {
        const order = await this.getByIdAsync(id);
        return await this.ordersRepository.remove(order);
    }

    async getUserByOrderIdAsync(orderId: number): Promise<User> {
        const order = await this.ordersRepository.findOne(orderId);
        return await this.usersService.getByIdAsync(order.userId);
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
