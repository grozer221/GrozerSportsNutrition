import {Field, InputType} from '@nestjs/graphql';
import {ShippingMethod} from '../order.entity';
import {CreateProductInOrderInput} from './create-product-in-order.input';

@InputType()
export class CreateOrderInput {
    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phoneNumber: string;

    @Field()
    address: string;

    @Field(() => ShippingMethod)
    shippingMethod: ShippingMethod;

    @Field(() => [CreateProductInOrderInput])
    createProductInOrder: CreateProductInOrderInput[];
}
