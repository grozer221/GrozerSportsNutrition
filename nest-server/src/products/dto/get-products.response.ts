import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../product.entity';

@ObjectType()
export class GetProductsResponse {
    @Field(() => [Product])
    products: Product[];

    @Field(() => Int)
    total: number;
}
