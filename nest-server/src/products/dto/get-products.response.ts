import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../product.entity';

@ObjectType()
export class GetProductsResponse {
    @Field(type => [Product])
    products: Product[];

    @Field(type => Int)
    total: number;
}
