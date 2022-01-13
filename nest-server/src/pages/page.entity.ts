import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { pagesConstants } from './pages.constants';

@Entity(pagesConstants.tableName)
@ObjectType()
export class Page {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column('boolean', { default: false })
    @Field(() => Boolean)
    isShown: boolean;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    slug: string;

    @Column('text')
    @Field()
    text: string;

    @Column('int')
    @Field(() => Int)
    sorting: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
