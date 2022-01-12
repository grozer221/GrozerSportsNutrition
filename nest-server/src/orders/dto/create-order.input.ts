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

    @Field({nullable: true})
    deliveryCityCode: string;

    @Field({nullable: true})
    deliveryCityName: string;

    @Field({nullable: true})
    deliveryWarehouse: string;

    @Field(() => ShippingMethod)
    shippingMethod: ShippingMethod;

    @Field(() => [CreateProductInOrderInput])
    createProductInOrder: CreateProductInOrderInput[];
}
