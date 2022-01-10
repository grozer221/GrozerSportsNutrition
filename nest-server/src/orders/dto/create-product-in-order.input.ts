import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CreateProductInOrderInput {
    @Field(() => Int)
    productId: number;

    @Field(() => Int)
    productQuantity: number;
}
