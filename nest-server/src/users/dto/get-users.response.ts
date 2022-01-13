import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '../user.entity';

@ObjectType()
export class GetUsersResponse {
    @Field(() => [User])
    users: User[];

    @Field(() => Int)
    total: number;
}
