import {Field, InputType} from '@nestjs/graphql';
import {UpdateRoleInput} from '../../roles/dto/update-role.input';

@InputType()
export class UpdateUserInput {
    @Field(() => Number)
    id: number;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => [UpdateRoleInput])
    roles: UpdateRoleInput[];
}
