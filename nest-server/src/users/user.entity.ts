import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { webcrypto } from 'crypto';
import { genSalt, hash } from 'bcrypt';

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
        default: Role.CUSTOMER,
    })
    role: Role;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}


