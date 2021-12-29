import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  @Field()
  text: string;
}
