import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/user.entity';

@ObjectType()
export class AuthResponse {
    @Field(() => User)
    user: User;

    @Field()
    accessToken: string;
}
