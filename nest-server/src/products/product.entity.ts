import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { productsConstants } from './products.constants';
import { File } from '../files/file.entity';
import { User } from '../users/user.entity';

@ObjectType()
export class Characteristic {
    @Field()
    name: string;
    @Field()
    value: string;
}

@InputType()
export class CharacteristicInputType {
    @Field()
    name: string;
    @Field()
    value: string;
}

@Entity(productsConstants.tableName)
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column('boolean', { default: true })
    @Field(() => Boolean)
    isShown: boolean;

    @Column({ unique: true })
    @Field()
    name: string;

    @Column('int')
    @Field(() => Number)
    quantity: number;

    @Column('int')
    @Field(() => Number)
    priceUAH: number;

    @Column()
    @Field()
    description: string;

    @Column({
        type: 'json',
        array: false,
    })
    @Field(() => [Characteristic], {nullable: true})
    characteristics: Characteristic[];

    @ManyToMany(() => File, file => file.products)
    @JoinTable()
    @Field(() => [File])
    files: File[];

    @ManyToOne(() => User, user => user.products)
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
