import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {CreateOrderInput} from './dto/create-order.input';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';

@Injectable()
export class CustomerOrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        private readonly usersService: UsersService,
    ) {
    }

    async createAsync(createOrderInput: CreateOrderInput, currentUser: User): Promise<Order> {
        const order = this.ordersRepository.create(createOrderInput);
        order.user = await this.usersService.getByIdAsync(currentUser.id);
        return await this.ordersRepository.save(order);
    }
}
