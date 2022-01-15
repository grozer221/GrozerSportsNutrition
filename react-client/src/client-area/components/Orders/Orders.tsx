import React, {FC, useState} from 'react';
import {getOrders} from '../../../admin-area/gql/orders-query';
import {Button, Collapse, message, Pagination, Popconfirm} from 'antd';
import s from '../Account/Account.module.css';
import {Order, OrderStatus} from '../../../types/types';
import {useMutation, useQuery} from '@apollo/client';
import {CANCEL_ORDER_MUTATION, CancelOrderData, CancelOrderVars} from '../../gql/orders-mutation';
import {gqlLinks} from '../../../common-area/gql/client';
import {OrderHeader} from './OrderHeader';
import {GET_MY_ORDERS_QUERY, GetMyOrdersData, GetMyOrdersVars} from '../../gql/orders-query';

type Props = {
    ordersObj: getOrders
    setOrdersObj: (ordersObj: getOrders) => void
};

export const Orders: FC<Props> = ({ordersObj, setOrdersObj}) => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const [cancelOrderMutation, cancelOrderMutationOptions] = useMutation<CancelOrderData, CancelOrderVars>(CANCEL_ORDER_MUTATION,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const getMyOrdersQuery = useQuery<GetMyOrdersData, GetMyOrdersVars>(GET_MY_ORDERS_QUERY,
        {
            variables: {
                getOrdersInput: {
                    skip: pageSkip,
                    take: pageTake,
                    like: '',
                    orderStatus: null,
                },
            },
            context: {gqlLink: gqlLinks.customer},
        },
    );

    const clickCancelOrderHandler = async (orderId: number) => {
        const response = await cancelOrderMutation({
            variables: {id: orderId},
        });
        if (!response.errors) {
            message.success('Order successfully canceled');
            const newOrders = ordersObj.orders?.map(order => order.id === orderId ? {
                ...order,
                orderStatus: response.data?.cancelOrder.orderStatus,
            } : order);
            setOrdersObj({total: ordersObj.total, orders: newOrders as Order[]});
        } else {
            response.errors.map(error => message.error(error.message));
        }
    };

    return (
        <>
            <Collapse expandIconPosition={'right'} className={s.orders}>
                {ordersObj?.orders?.map(order => (
                    <Collapse.Panel header={<OrderHeader order={order}/>} key={order.id}>
                        <table className="infoTable">
                            <tbody>
                            <tr>
                                <td>Email:</td>
                                <td>
                                    <span>{order?.email}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>FirstName:</td>
                                <td>
                                    <span>{order?.firstName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>LastName:</td>
                                <td>
                                    <span>{order?.lastName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Phone number:</td>
                                <td>
                                    <span>{order?.phoneNumber}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>
                                    <span>{order?.address}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Shipping method:</td>
                                <td>
                                    <span>{order?.shippingMethod}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Order status:</td>
                                <td>
                                    <span>{order?.orderStatus}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {order.orderStatus === OrderStatus.new && (
                            <Popconfirm
                                title="Are you sure to cancel this order?"
                                onConfirm={() => clickCancelOrderHandler(order.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button className={s.buttonCancelOrder} type={'primary'}
                                        loading={cancelOrderMutationOptions.loading}
                                >
                                    Cancel
                                </Button>
                            </Popconfirm>

                        )}
                    </Collapse.Panel>
                ))}
            </Collapse>
            <Pagination total={ordersObj.total}
                        onChange={async (pageNumber) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setPageSkip(pageSkip);
                            await getMyOrdersQuery.refetch({
                                getOrdersInput: {
                                    skip: pageSkip,
                                    take: pageTake,
                                    like: '',
                                    orderStatus: null,
                                },
                            });
                        }}
            />
        </>
    );
};
