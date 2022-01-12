import {Field, InputType} from '@nestjs/graphql';
import {IsEmail} from 'class-validator';

@InputType()
export class UpdateEmailInput {
    @IsEmail()
    @Field()
    email: string;
}
