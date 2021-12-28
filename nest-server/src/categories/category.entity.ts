import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { categoriesConstants } from './categories.constants';
import { Product } from '../products/product.entity';

@Entity(categoriesConstants.tableName)
@ObjectType()
export class Category {
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

  @Column()
  @Field()
  description: string;

  @ManyToMany(() => Product, product => product.categories)
  @Field(() => [Product], {nullable: true})
  products: Product[];
}
