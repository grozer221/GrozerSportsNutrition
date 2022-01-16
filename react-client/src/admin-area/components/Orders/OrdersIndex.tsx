import {useMutation, useQuery} from '@apollo/client';
import {Button, Divider, message, Select, Table} from 'antd';
import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {all, Order, OrderStatus} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_ORDERS_QUERY, GetOrdersData, GetOrdersVars} from '../../gql/orders-query';
import {REMOVE_ORDER_MUTATION, RemoveOrderData, RemoveOrderVars} from '../../gql/orders-mutation';
import {getStringFromCamelCase, getStringFromDate} from '../../../utils/stringActions';
import Search from 'antd/es/input/Search';
import debounce from 'lodash.debounce';
import {ColumnsType} from 'antd/es/table';
import s from './OrdersIndex.module.css';

export const OrdersIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const [searchLike, setSearchLike] = useState('');
    const [orderStatus, setOrderStatus] = useState<OrderStatus | typeof all>(all);
    const getOrdersQuery = useQuery<GetOrdersData, GetOrdersVars>(
        GET_ORDERS_QUERY,
        {
            variables: {
                getOrdersInput: {
                    skip: pageSkip,
                    take: pageTake,
                    like: searchLike,
                    orderStatus: orderStatus === all ? null : orderStatus,
                },
            },
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
            await getOrdersQuery.refetch({
                getOrdersInput: {
                    skip: pageSkip,
                    take: pageTake,
                    like: searchLike,
                    orderStatus: orderStatus === all ? null : orderStatus,
                },
            });
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
                <ButtonsVUR viewUrl={`${order.id}`} updateUrl={`update/${order.id}`}
                            onRemove={() => onRemove(order.id)}/>
            ),
        },
    ];

    const onSearchOrdersHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const newPageSkip = 0;
        const newSearchLike = e.target.value;
        setPageSkip(newPageSkip);
        setSearchLike(newSearchLike);
        const response = await getOrdersQuery.refetch({
            getOrdersInput: {
                skip: newPageSkip,
                take: pageTake,
                like: newSearchLike,
                orderStatus: orderStatus === all ? null : orderStatus,
            },
        });
        if (response.errors)
            response.errors?.forEach(error => message.error(error.message));
    };

    const debouncedSearchOrdersHandler = useCallback(debounce(nextValue => onSearchOrdersHandler(nextValue), 500), []);
    const searchOrdersHandler = (e: ChangeEvent<HTMLInputElement>) => debouncedSearchOrdersHandler(e);

    const selectOrderStatusHandler = async (value: OrderStatus | typeof all) => {
        const newPageSkip = 0;
        setPageSkip(newPageSkip);
        setOrderStatus(value);
        await getOrdersQuery.refetch({
            getOrdersInput: {
                skip: newPageSkip,
                take: pageTake,
                like: searchLike,
                orderStatus: value === all ? null : value,
            },
        });
    };

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
                <div className={s.filters}>
                    <Select defaultValue={orderStatus} onChange={selectOrderStatusHandler}>
                        <Select.Option value={all}>all</Select.Option>
                        {(Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map((key, i) => (
                            <Select.Option value={key} key={i}>{getStringFromCamelCase(key)}</Select.Option>
                        ))}
                    </Select>
                    <Search placeholder="Search orders" className={'search'}
                            onChange={searchOrdersHandler} enterButton
                            loading={getOrdersQuery.loading}/>
                </div>
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
                            setPageSkip(pageSkip);
                            await getOrdersQuery.refetch({
                                getOrdersInput: {
                                    skip: pageSkip,
                                    take: pageTake,
                                    like: searchLike,
                                    orderStatus: orderStatus === all ? null : orderStatus,
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

