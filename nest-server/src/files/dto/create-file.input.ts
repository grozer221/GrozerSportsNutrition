import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
    @Field()
    originalName: string;

    @Field()
    mimetype: string;

    @Field()
    destination: string;

    @Field()
    fileName: string;

    @Field(type => Int)
    size: number;
}
