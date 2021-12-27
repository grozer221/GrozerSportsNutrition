import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { filesConstants } from './files.constants';
import { Product } from '../products/product.entity';



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

    @Field()
    filePath: string;

    @Field()
    fileImage: string;

    @Column('int')
    @Field(type => Int)
    size: number;

    @ManyToMany(type => Product, product => product.files)
    @Field(type => [Product])
    products: Product[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
