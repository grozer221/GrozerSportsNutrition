import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { filesConstants } from './files.constants';



@Entity(filesConstants.tableName)
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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
