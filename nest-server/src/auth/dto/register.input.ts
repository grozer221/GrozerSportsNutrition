import {Field, InputType} from '@nestjs/graphql';
import {IsEmail, MinLength} from 'class-validator';

@InputType()
export class RegisterInput {
    @IsEmail()
    @Field()
    email: string;

    @MinLength(2)
    @Field()
    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
