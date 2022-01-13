import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
    @Field(() => Boolean)
    isShown: boolean;

    @Field()
    name: string;

    @Field()
    description: string;
}
