import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Characteristic {
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    value: string;
}
