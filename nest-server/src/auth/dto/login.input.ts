import {Field, InputType} from '@nestjs/graphql';
import {IsEmail, MinLength} from 'class-validator';

@InputType()
export class LoginInput {
    @IsEmail()
    @Field()
    email: string;

    @MinLength(2)
    @Field()
    password: string;
}
