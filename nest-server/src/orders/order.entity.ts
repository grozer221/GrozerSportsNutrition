import {Field, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ordersConstants} from './orders.constants';
import {User} from '../users/user.entity';

export enum OrderStatus {
    new = 'new',
    picking = 'picking',
    delivering = 'delivering',
    waitingForTheCustomerAtThePickUpPoint = 'waitingForTheCustomerAtThePickUpPoint',
    completed = 'completed',
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

    @ManyToOne(() => User, user => user.orders)
    @Field(() => User)
    user: User;

    @Column({ nullable: false })
    @Field(() => Number)
    userId: number;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;
}
