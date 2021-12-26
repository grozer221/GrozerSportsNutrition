import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
    @Field(type => Int)
    id: number;
    @Field()
    name: string;
    @Field(() => Boolean)
    isShown: boolean;
}
