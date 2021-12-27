import { Field, InputType } from '@nestjs/graphql';
import { CharacteristicInputType } from '../product.entity';

@InputType()
export class CreateProductInput {
    @Field(() => Boolean)
    isShown: boolean;

    @Field()
    name: string;

    @Field(() => [Number])
    filesIds: number[];

    @Field(() => Number)
    quantity: number;

    @Field(() => Number)
    priceUAH: number;

    @Field(() => String)
    description: string;

    @Field(() => [CharacteristicInputType], {nullable: true})
    characteristics: CharacteristicInputType[];
}
