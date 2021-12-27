import { Field, InputType, Int } from '@nestjs/graphql';
import { File } from '../../files/file.entity';
import { CharacteristicInputType } from '../product.entity';

@InputType()
export class UpdateProductInput {
    @Field(() => Int)
    id: number;

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

    files: File[];
}
