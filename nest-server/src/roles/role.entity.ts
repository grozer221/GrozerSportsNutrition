import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { rolesConstants } from './roles.constants';

export enum RoleName {
    admin = 'admin',
    moderator = 'moderator',
    customer = 'customer',
}

export enum RoleColor {
    magenta = 'magenta',
    red = 'red',
    volcano = 'volcano',
    orange = 'orange',
    gold = 'gold',
    lime = 'lime',
    green = 'green',
    cyan = 'cyan',
    blue = 'blue',
    geekblue = 'geekblue',
    purple = 'purple',
}

registerEnumType(RoleName, { name: 'RoleName' });

@Entity(rolesConstants.tableName)
@ObjectType()
export class Role {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({
        type: 'enum',
        enum: RoleName,
        default: RoleName.customer,
    })
    @Field(() => RoleName)
    name: RoleName;

    @Column({default: 'purple'})
    @Field()
    color: string;

    @ManyToMany(() => User, user => user.roles)
    @Field(() => [User])
    users: User[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
