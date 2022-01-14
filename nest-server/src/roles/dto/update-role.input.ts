import {Field, InputType} from '@nestjs/graphql';
import {RoleName} from '../role.entity';

@InputType()
export class UpdateRoleInput {
    @Field(() => Number)
    id: number;

    @Field(() => RoleName)
    name: RoleName;
}
