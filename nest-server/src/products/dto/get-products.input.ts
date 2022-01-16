import {Field, InputType, Int, registerEnumType} from '@nestjs/graphql';
import {Max, Min} from 'class-validator';
import {OrderBy} from '../../utils/order-by.enum';

registerEnumType(OrderBy, {name: 'OrderBy'});

@InputType()
export class GetProductsInput {
    @Min(1)
    @Max(20)
    @Field(() => Int)
    take: number;

    @Min(0)
    @Field(() => Int)
    skip: number;

    @Field()
    likeName: string;

    @Field()
    orderBy: OrderBy;
}
