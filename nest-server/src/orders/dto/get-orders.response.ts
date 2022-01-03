import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from '../order.entity';

@ObjectType()
export class GetOrdersResponse {
    @Field(() => [Order])
    orders: Order[];

    @Field(() => Int)
    total: number;
}
