import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ unique: true })
    @Field()
    name: string;
}
