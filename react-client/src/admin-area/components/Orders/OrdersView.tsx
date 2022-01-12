import React, {FC} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Avatar, Carousel, message, Table} from 'antd';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_ORDER_QUERY, GetOrderData, GetOrderVars} from '../../gql/orders-query';
import s from './OrdersView.module.css';
import {REMOVE_ORDER_MUTATION, RemoveOrderData, RemoveOrderVars} from '../../gql/orders-mutation';
import {ProductInOrder} from '../../../types/types';

export const OrdersView: FC = () => {
    const params = useParams();
    const orderId = params.id ? parseInt(params.id) : 0;
    const getOrderQuery = useQuery<GetOrderData, GetOrderVars>(
        GET_ORDER_QUERY,
        {
            variables: {id: orderId},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeOrder, removeOrderOptions] = useMutation<RemoveOrderData, RemoveOrderVars>(REMOVE_ORDER_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const navigate = useNavigate();

    const onRemove = async (orderId: number) => {
        const response = await removeOrder({variables: {id: orderId}});
        if (response.data)
            navigate(`../`);
        else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, productInOrder: ProductInOrder) => <span>#{productInOrder.product.id}</span>,
        },
        {
            title: 'Image',
            dataIndex: 'fileImage',
            key: 'fileImage',
            render: (text: any, productInOrder: ProductInOrder) => (
                <Carousel className={s.carousel}>
                    {productInOrder.product.files.map(file => (
                        <Avatar key={file.id} className={s.image} shape={'square'} size={64} src={file.fileImage}
                                alt={file.fileName}/>
                    ))}
                </Carousel>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, productInOrder: ProductInOrder) => <span>{productInOrder.product.name}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: any, productInOrder: ProductInOrder) => <span>{productInOrder.product.priceUAH}</span>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: any, productInOrder: ProductInOrder) => <span>{productInOrder.productQuantity}</span>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, productInOrder: ProductInOrder) => (
                <ButtonsVUR viewUrl={`../../products/${productInOrder.product.slug}`}/>
            ),
        },
    ];

    if (!orderId || getOrderQuery.error)
        return <Navigate to={'../../error'}/>;

    if (getOrderQuery.loading)
        return <Loading/>;

    const order = getOrderQuery.data?.getOrder;
    return (
        <>
            <div className={s.photosAndMainInfo}>
                <div>
                    <ButtonsVUR updateUrl={`../update/${orderId}`} onRemove={() => onRemove(orderId)}/>
                    <header>#{order?.id}</header>
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
                        <tr>
                            <td>User:</td>
                            <td>
                                <Link
                                    to={`../../users/${order?.user.email}`}>{order?.user.firstName} {order?.user.lastName}</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>Total price:</td>
                            <td>
                                <span>{order?.totalPrice} UAH</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {(order && order?.productsInOrder.length > 0) && (
                        <Table columns={columns} dataSource={order.productsInOrder} pagination={false}
                               rowKey={'id'}/>
                    )}
                </div>
            </div>
        </>
    );
};
