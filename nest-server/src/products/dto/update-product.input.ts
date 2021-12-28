import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    @Field(() => Int)
    id: number;
}

@InputType()
export class UpdateProductWithoutFilesInput extends OmitType(UpdateProductInput, ['files'] as const) {}
