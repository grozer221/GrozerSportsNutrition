import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@ObjectType()
export class File {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    originalName: string;

    @Column()
    @Field()
    mimetype: string;

    @Column()
    @Field()
    destination: string;

    @Column()
    @Field()
    fileName: string;

    @Column('int')
    @Field(type => Int)
    size: number;
}
