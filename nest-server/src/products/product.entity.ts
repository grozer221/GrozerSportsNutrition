import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { productsConstants } from './products.constants';
import { File } from '../files/file.entity';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Characteristic } from './characteristic.entity';
import {ProductInOrder} from '../orders/product-in-order.entity';

@Entity(productsConstants.tableName)
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column('boolean', { default: true })
    @Field(() => Boolean)
    isShown: boolean;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    slug: string;

    @Column('int')
    @Field(() => Number)
    quantity: number;

    @Column('int')
    @Field(() => Number)
    priceUAH: number;

    @Column('text')
    @Field()
    description: string;

    @Column({
        type: 'json',
        array: false,
    })
    @Field(() => [Characteristic], { nullable: true })
    characteristics: Characteristic[];

    @ManyToMany(() => File, file => file.products)
    @JoinTable()
    @Field(() => [File])
    files: File[];

    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    @Field(() => [Category], { nullable: true })
    categories: Category[];

    @ManyToOne(() => User, user => user.products)
    user: User;

    @OneToMany(() => ProductInOrder, productInOrder => productInOrder.product)
    productsInOrder: ProductInOrder[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
