import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ordersConstants } from './orders.constants';

export enum OrderStatus {
    new = 'new',
    picking = 'picking',
    delivering = 'delivering',
    waitingForTheCustomerAtThePickUpPoint = 'waitingForTheCustomerAtThePickUpPoint',
    completed = 'completed',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@Entity(ordersConstants.tableName)
@ObjectType()
export class Order {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    customerFirstName: string;

    @Column()
    @Field()
    customerLastName: string;

    @Column()
    @Field()
    customerMiddleName: string;

    @Column()
    @Field()
    customerPhoneNumber: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.new,
    })
    @Field(() => OrderStatus)
    orderStatus: OrderStatus;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
