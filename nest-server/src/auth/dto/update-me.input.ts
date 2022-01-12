import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateMeInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
