import {useMutation, useQuery} from '@apollo/client';
import {Button, Divider, message, Table} from 'antd';
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Order} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_ORDERS_QUERY, GetOrdersData, GetOrdersVars} from '../../gql/orders-query';
import {REMOVE_ORDER_MUTATION, RemoveOrderData, RemoveOrderVars} from '../../gql/orders-mutation';
import {getStringFromCamelCase} from '../../../utils/getStringFromCamelCase';

export const OrdersIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const getOrdersQuery = useQuery<GetOrdersData, GetOrdersVars>(
        GET_ORDERS_QUERY,
        {
            variables: {getOrdersInput: {skip: pageSkip, take: pageTake}},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeOrder, removeOrderOptions] = useMutation<RemoveOrderData, RemoveOrderVars>(REMOVE_ORDER_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const [selectedProducts, setOrdersProducts] = useState<Order[]>([]);

    const onRemove = async (orderId: number) => {
        const response = await removeOrder({variables: {id: orderId}});
        if (response.data)
            await getOrdersQuery.refetch({getOrdersInput: {skip: pageSkip, take: pageTake}});
        else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Order[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setOrdersProducts(selectedRows);
        },
    };

    const columns = [
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
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, order: Order) => (
                <ButtonsVUR viewUrl={`${order.id}`} updateUrl={`update/${order.id}`}
                            onRemove={() => onRemove(order.id)}/>
            ),
        },
    ];

    if (getOrdersQuery.loading)
        return <Loading/>;

    if (getOrdersQuery.error)
        message.error(getOrdersQuery.error.message);

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Orders</header>
                    <Link to={'create'}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <strong>search</strong>
            </div>
            <Divider/>
            <div>
                <Table
                    loading={getOrdersQuery.loading || removeOrderOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={getOrdersQuery.data?.getOrders.orders}
                    pagination={{
                        total: getOrdersQuery.data?.getOrders.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await getOrdersQuery.refetch({
                                getOrdersInput: {
                                    skip: pageSkip,
                                    take: pageTake,
                                },
                            });
                        },
                    }}
                    rowKey={'id'}
                />
            </div>
        </>
    );
};

