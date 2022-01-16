import React, {FC} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Table, Tag} from 'antd';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';
import {GET_USER_QUERY, GetUserData, GetUserVars} from '../../gql/users-query';
import s from './UsersView.module.css';
import {ColumnsType} from 'antd/es/table';
import {Order} from '../../../types/types';
import {getStringFromCamelCase, getStringFromDate} from '../../../utils/stringActions';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';

export const UsersView: FC = () => {
    const params = useParams();
    const userEmail = params.email || '';
    const getUserQuery = useQuery<GetUserData, GetUserVars>(
        GET_USER_QUERY,
        {
            variables: {email: userEmail},
            context: {gqlLink: gqlLinks.admin},
        },
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
                <ButtonsVUR viewUrl={`../../orders/${order.id}`} updateUrl={`../../orders/update/${order.id}`}/>
            ),
        },
    ];

    if (!userEmail || getUserQuery.error)
        return <Error/>;

    if (getUserQuery.loading)
        return <Loading/>;

    const user = getUserQuery.data?.getUser;
    return (
        <>
            <div className={s.photosAndMainInfo}>
                <header>{user?.email}</header>
                <table className="infoTable">
                    <tbody>
                    <tr>
                        <td>Id:</td>
                        <td>
                            <span># {user?.id}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>FirstName:</td>
                        <td>
                            <span>{user?.firstName}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>LastName:</td>
                        <td>
                            <span>{user?.lastName}</span>
                        </td>
                    </tr>
                    {(user && user?.roles.length > 0) && (
                        <tr>
                            <td>Roles:</td>
                            <td className={s.roles}>
                                {user.roles.map(role => (
                                    <Tag key={role.id} color={role.color}>{role.name}</Tag>
                                ))}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <Table
                    title={() => <div className={s.ordersTitle}>Orders</div>}
                    columns={columns}
                    dataSource={getUserQuery.data?.getUser.orders}
                    // pagination={{
                    //     total: getOrdersQuery.data?.getOrders.total,
                    //     onChange: async (pageNumber: number) => {
                    //         const pageSkip = (pageNumber - 1) * pageTake;
                    //         setPageSkip(pageSkip);
                    //         await getOrdersQuery.refetch({
                    //             getOrdersInput: {
                    //                 skip: pageSkip,
                    //                 take: pageTake,
                    //                 like: searchLike,
                    //                 orderStatus: orderStatus === all ? null : orderStatus,
                    //             },
                    //         });
                    //     },
                    // }}
                    pagination={false}
                    rowKey={'id'}
                />
            </div>
        </>
    );
};
