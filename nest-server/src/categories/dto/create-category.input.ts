import { Field, InputType } from '@nestjs/graphql';
import { UpdateProductWithoutFilesInput } from '../../products/dto/update-product.input';

@InputType()
export class CreateCategoryInput {
  @Field(() => Boolean)
  isShown: boolean;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [UpdateProductWithoutFilesInput])
  products: UpdateProductWithoutFilesInput[];
}
