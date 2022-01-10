import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ordersConstants} from './orders.constants';
import {Product} from '../products/product.entity';
import {Order} from './order.entity';


@Entity(ordersConstants.productInOrderTableName)
@ObjectType()
export class ProductInOrder {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ManyToOne(() => Product, product => product.productsInOrder)
    @Field(() => Product)
    product: Product;

    @Column('int', {nullable: false})
    @Field(() => Int)
    productId: number;

    @Column('int')
    @Field(() => Int)
    productQuantity: number;

    @ManyToOne(() => Order, order => order.productsInOrder, {onDelete: 'CASCADE'})
    @Field(() => Order)
    order: Order;

    @Column('int', {nullable: false})
    @Field(() => Int)
    orderId: number;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;
}
