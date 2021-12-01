import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { rolesConstants } from './roles.constants';

export enum RoleName {
    admin = 'admin',
    moderator = 'moderator',
    customer = 'customer',
}

registerEnumType(RoleName, { name: 'RoleName' });

@Entity(rolesConstants.tableName)
@ObjectType()
export class Role {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({
        type: 'enum',
        enum: RoleName,
        default: RoleName.customer,
    })
    @Field(type => RoleName)
    name: RoleName;

    @ManyToMany(type => User, user => user.roles)
    @Field(type => [User])
    users: User[];
}
