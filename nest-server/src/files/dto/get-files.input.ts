import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class GetFilesInput {
    @Min(1)
    @Max(20)
    @Field(type => Int)
    take: number;

    @Min(0)
    @Field(type => Int)
    skip: number;
}
