import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CharacteristicInputType {
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    value: string;
}
