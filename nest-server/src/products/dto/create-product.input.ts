import { Field, InputType } from '@nestjs/graphql';
import { CharacteristicInputType } from '../product.entity';
import { UpdateFileInput } from '../../files/dto/update-file.input';

@InputType()
export class CreateProductInput {
    @Field(() => Boolean)
    isShown: boolean;

    @Field()
    name: string;

    @Field(() => Number)
    quantity: number;

    @Field(() => Number)
    priceUAH: number;

    @Field(() => String)
    description: string;

    @Field(() => [CharacteristicInputType], {nullable: true})
    characteristics: CharacteristicInputType[];

    @Field(() => [UpdateFileInput])
    files: UpdateFileInput[];
}
