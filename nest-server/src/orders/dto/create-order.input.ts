import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
    @Field()
    customerFirstName: string;

    @Field()
    customerLastName: string;

    @Field()
    customerMiddleName: string;
}
