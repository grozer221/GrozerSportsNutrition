import {Field, Float, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class ProfitStatistics {
    @Field({nullable: true})
    date: string;

    @Field(() => Float, {nullable: true})
    totalPrice: number;
}
