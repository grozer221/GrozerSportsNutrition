import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class GetOrdersInput {
    @Min(1)
    @Max(20)
    @Field(() => Int)
    take: number;

    @Min(0)
    @Field(() => Int)
    skip: number;

    @Field()
    like: string;
}
