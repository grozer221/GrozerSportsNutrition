import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Role } from '../roles/role.entity';
import { usersConstants } from './users.constants';

// export enum Role {
//     CUSTOMER = 'customer',
//     ADMIN = 'admin',
//     EDITOR = 'editor'
// }

@Entity(usersConstants.tableName)
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

    @ManyToMany(type => Role, role => role.users)
    @JoinTable()
    @Field(type => [Role])
    roles: Role[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}


