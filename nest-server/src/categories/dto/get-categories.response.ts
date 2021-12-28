import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '../category.entity';

@ObjectType()
export class GetCategoriesResponse {
    @Field(() => [Category])
    categories: Category[];

    @Field(() => Int)
    total: number;
}
