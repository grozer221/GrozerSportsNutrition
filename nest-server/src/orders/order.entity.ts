import {Field, Float, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {ordersConstants} from './orders.constants';
import {User} from '../users/user.entity';
import {ProductInOrder} from './product-in-order.entity';

export enum OrderStatus {
    new = 'new',
    picking = 'picking',
    delivering = 'delivering',
    waitingForTheCustomerAtThePickUpPoint = 'waitingForTheCustomerAtThePickUpPoint',
    completed = 'completed',
    canceled = 'canceled',
}

registerEnumType(OrderStatus, {name: 'OrderStatus'});

export enum ShippingMethod {
    warehouse = 'warehouse',
    courier = 'courier',
}

registerEnumType(ShippingMethod, {name: 'ShippingMethod'});

@Entity(ordersConstants.tableName)
@ObjectType()
export class Order {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    phoneNumber: string;

    @Column()
    @Field()
    address: string;

    @Column({nullable: true})
    @Field({nullable: true})
    deliveryCityCode: string;

    @Column({nullable: true})
    @Field({nullable: true})
    deliveryCityName: string;

    @Column({nullable: true})
    @Field({nullable: true})
    deliveryWarehouse: string;

    @Column('float', {default: 0})
    @Field(() => Float)
    totalPrice: number;

    @Column({
        type: 'enum',
        enum: ShippingMethod,
        default: ShippingMethod.warehouse,
    })
    @Field(() => ShippingMethod)
    shippingMethod: ShippingMethod;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.new,
    })
    @Field(() => OrderStatus)
    orderStatus: OrderStatus;

    @ManyToOne(() => User, user => user.orders, {onDelete: 'CASCADE'})
    @Field(() => User)
    user: User;

    @Column('int', {nullable: false})
    @Field(() => Int)
    userId: number;

    @OneToMany(() => ProductInOrder, productInOrder => productInOrder.product)
    @Field(() => [ProductInOrder])
    productsInOrder: ProductInOrder[];

    @Field(() => Date)
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;
}
