import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {GetOrdersResponse} from './dto/get-orders.response';
import {GetOrdersInput} from './dto/get-orders.input';
import {UpdateOrderInput} from './dto/update-order.input';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';

@Injectable()
export class AdminOrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        private readonly usersService: UsersService,
    ) {
    }

    async getTotalAsync(): Promise<number> {
        return await this.ordersRepository.count();
    }

    async createAsync(createOrderInput: CreateOrderInput): Promise<Order> {
        const order = this.ordersRepository.create(createOrderInput);
        return await this.ordersRepository.save(order);
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
        return await this.ordersRepository.save(updateOrderInput);
    }

    async removeAsync(id: number): Promise<Order> {
        const order = await this.getByIdAsync(id);
        return await this.ordersRepository.remove(order);
    }

    async getUserByOrderIdAsync(orderId: number): Promise<User> {
        const order = await this.ordersRepository.findOne(orderId);
        return await this.usersService.getByIdAsync(order.userId);
    }
}
