import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
    EDITOR = 'editor'
}

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    email: string;

    @Column()
    password: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.CUSTOMER
    })
    role: Role;

    // @Column()
    // @Field(type => Int)
    // roleId: number;
    //
    // @ManyToOne(type => Role, role => role.users)
    // @Field(type => Role)
    // role: Role;
}


