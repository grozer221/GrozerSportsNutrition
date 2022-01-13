import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreatePageInput {
  @Field(() => Boolean)
  isShown: boolean;

  @Field()
  name: string;

  @Column('text')
  @Field()
  text: string;
}
