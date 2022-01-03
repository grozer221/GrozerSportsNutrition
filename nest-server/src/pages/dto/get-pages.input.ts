import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderByType } from '../../enums/order-by-type';

export enum GetPagesOrderBy {
  sorting = 'sorting',
}

registerEnumType(GetPagesOrderBy, { name: 'GetPagesOrderBy' });

@InputType()
export class GetPagesInput {
  @Field(() => GetPagesOrderBy)
  orderBy: GetPagesOrderBy;

  @Field(() => OrderByType)
  orderByType: OrderByType;

  @Field(() => Boolean)
  isShown: boolean;
}
