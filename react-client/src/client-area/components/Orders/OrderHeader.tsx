// @flow
import * as React from 'react';
import {FC} from 'react';
import {Order} from '../../../types/types';
import s from '../Account/Account.module.css';
import {Avatar, Carousel} from 'antd';
import {getStringFromDate} from '../../../utils/stringActions';

type Props = {
    order: Order
};

export const OrderHeader: FC<Props> = ({order}) => {
    return (
        <div className={s.orderHeader}>
            <div className={s.orderHeaderInfo}>
                <div>
                    <div>#{order.id}</div>
                    <div>{getStringFromDate(order.createdAt)}</div>
                    <div>Status: {order.orderStatus}</div>
                </div>
                <div>Total price: {order.totalPrice} UAH</div>
            </div>
            <div className={s.products}>
                {order.productsInOrder.map(productInOrder => (
                    <Carousel autoplay className={s.carousel} key={productInOrder.id}>
                        {productInOrder?.product?.files.map(file => (
                            <Avatar key={file.id} className={s.image} shape={'square'} src={file.fileImage}
                                    size={48}/>
                        ))}
                    </Carousel>
                ))}
            </div>
        </div>
    );
};
