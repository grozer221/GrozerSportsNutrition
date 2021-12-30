import { Field, InputType } from '@nestjs/graphql';
import { UpdatePageInput } from './update-page.input';

@InputType()
export class UpdatePagesInput {
  @Field(() => [UpdatePageInput])
  updatePagesInput: UpdatePageInput[];
}
