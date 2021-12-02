import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
