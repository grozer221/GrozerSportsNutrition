import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
    @Field()
    name: string;
}
