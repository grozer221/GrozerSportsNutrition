import { CreateCategoryInput } from './create-category.input';
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
	@Field(() => Int)
	id: number;
}
