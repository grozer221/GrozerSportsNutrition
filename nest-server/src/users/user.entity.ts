import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Role } from '../roles/role.entity';
import { usersConstants } from './users.constants';
import { Product } from '../products/product.entity';

@Entity(usersConstants.tableName)
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column('boolean', { default: false })
    @Field(() => Boolean)
    confirmedEmail: boolean;

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

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    @Field(() => [Role])
    roles: Role[];

    @OneToMany(() => Product, product => product.user)
    products: Product[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}


