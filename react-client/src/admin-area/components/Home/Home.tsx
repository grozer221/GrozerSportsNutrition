import React, {FC, useState} from 'react';
import {OrdersStatisticsChart} from '../Charts/OrdersStatisticsChart';
import {useQuery} from '@apollo/client';
import {GET_ORDERS_QUERY, GetOrdersData, GetOrdersVars} from '../../gql/orders-query';
import {gqlLinks} from '../../../common-area/gql/client';
import {Order, OrderStatus} from '../../../types/types';
import {ColumnsType} from 'antd/es/table';
import {getStringFromCamelCase, getStringFromDate} from '../../../utils/stringActions';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {Table} from 'antd';
import {GET_STATISTICS_QUERY, GetStatisticsData, GetStatisticsVars} from '../../gql/statistics-query';
import s from './Home.module.css';
import {ProfitStatisticsChart} from '../Charts/ProfitStatisticsChart';

export const Home: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const getOrdersQuery = useQuery<GetOrdersData, GetOrdersVars>(
        GET_ORDERS_QUERY,
        {
            variables: {
                getOrdersInput: {
                    skip: pageSkip,
                    take: pageTake,
                    like: '',
                    orderStatus: OrderStatus.new,
                },
            },
            context: {gqlLink: gqlLinks.admin},
        },
    );

    const getStatisticsQuery = useQuery<GetStatisticsData, GetStatisticsVars>(GET_STATISTICS_QUERY,
        {context: {gqlLink: gqlLinks.admin}},
    );

    const columns: ColumnsType<Order> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, order: Order) => <>#{order.id}</>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Order status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (text: any, order: Order) => <span>{getStringFromCamelCase(order.orderStatus)}</span>,
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: any, order: Order) => <span>{order.totalPrice} UAH</span>,
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: any, order: Order) => <span>{getStringFromDate(order.createdAt)}</span>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, order: Order) => (
                <ButtonsVUR viewUrl={`./orders/${order.id}`} updateUrl={`./orders/update/${order.id}`}/>
            ),
        },
    ];

    return (
        <>
            <div className={s.wrapperCharts}>
                <div className={s.wrapperChart}>
                    <header>Orders statistics</header>
                    <OrdersStatisticsChart ordersStatistics={getStatisticsQuery.data?.getOrdersStatistics}
                                           loading={getStatisticsQuery.loading}/>
                </div>
                <div className={s.wrapperChart}>
                    <header>Profit statistics</header>
                    <ProfitStatisticsChart profitStatistics={getStatisticsQuery.data?.getProfitStatistics}
                                           loading={getStatisticsQuery.loading}/>
                </div>
            </div>
            <header>New orders</header>
            <Table
                loading={getOrdersQuery.loading}
                columns={columns}
                dataSource={getOrdersQuery.data?.getOrders.orders}
                pagination={{
                    total: getOrdersQuery.data?.getOrders.total,
                    onChange: async (pageNumber: number) => {
                        const pageSkip = (pageNumber - 1) * pageTake;
                        setPageSkip(pageSkip);
                        await getOrdersQuery.refetch({
                            getOrdersInput: {
                                skip: pageSkip,
                                take: pageTake,
                                like: '',
                                orderStatus: OrderStatus.new,
                            },
                        });
                    },
                }}
                rowKey={'id'}
            />
        </>
    );
};
