import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class GetProductsInput {
    @Min(1)
    @Max(20)
    @Field(() => Int)
    take: number;

    @Min(0)
    @Field(() => Int)
    skip: number;
}
