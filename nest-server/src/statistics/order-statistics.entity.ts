import {Field, Int, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class OrderStatistics {
    @Field({nullable: true})
    date: string;

    @Field(() => Int, {nullable: true})
    ordersCount: number;
}
