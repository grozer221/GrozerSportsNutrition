import {Field, InputType} from '@nestjs/graphql';
import {MinLength} from 'class-validator';

@InputType()
export class UpdatePasswordInput {
    @MinLength(2)
    @Field()
    oldPassword: string;

    @MinLength(2)
    @Field()
    newPassword: string;
}
