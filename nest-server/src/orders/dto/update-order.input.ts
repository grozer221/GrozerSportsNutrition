import { CreateOrderInput } from './create-order.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { OrderStatus } from '../order.entity';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
    @Field(() => Int)
    id: number;

    @Field(() => OrderStatus)
    orderStatus: OrderStatus;
}
