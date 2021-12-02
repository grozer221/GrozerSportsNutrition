import { Field, Int, ObjectType } from '@nestjs/graphql';
import { File } from '../file.entity';

@ObjectType()
export class GetFilesResponse {
    @Field(type => [File])
    files: File[];

    @Field(type => Int)
    total: number;
}
