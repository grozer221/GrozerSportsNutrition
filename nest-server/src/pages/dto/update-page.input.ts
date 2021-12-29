import { CreatePageInput } from './create-page.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePageInput extends PartialType(CreatePageInput) {
  @Field(() => Int)
  id: number;
}
