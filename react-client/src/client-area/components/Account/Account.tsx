import React, {FC, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    Carousel,
    Collapse,
    Form,
    Input,
    message,
    Modal,
    Pagination,
    Popconfirm,
    Tabs,
} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {s_getAuthData, s_getIsAuth} from '../../../redux/auth-selectors';
import {Error} from '../../../admin-area/components/Error/Error';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {useMutation, useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_MY_ORDERS_QUERY, GetMyOrdersData, GetMyOrdersVars} from '../../gql/orders-query';
import s from './Account.module.css';
import {
    UPDATE_EMAIL_MUTATION,
    UPDATE_ME_MUTATION,
    UPDATE_PASSWORD_MUTATION,
    UpdateEmailData,
    UpdateEmailVars,
    UpdateMeData,
    UpdateMeVars,
    UpdatePasswordData,
    UpdatePasswordVars,
} from '../../../common-area/gql/auth-mutation';
import {Order, OrderStatus} from '../../../types/types';
import {CANCEL_ORDER_MUTATION, CancelOrderData, CancelOrderVars} from '../../gql/orders-mutation';
import {useForm} from 'antd/es/form/Form';
import {login, logout} from '../../../redux/auth-reducer';
import {FormOutlined} from '@ant-design/icons';
import {Navigate} from 'react-router-dom';

export const Account: FC = () => {
    const authData = useSelector(s_getAuthData);
    const isAuth = useSelector(s_getIsAuth);
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const dispatch = useDispatch();
    const [myOrdersObj, setMyOrdersObj] = useState<{ orders?: Order[], total?: number }>({});
    const getMyOrdersQuery = useQuery<GetMyOrdersData, GetMyOrdersVars>(GET_MY_ORDERS_QUERY,
        {
            variables: {
                getOrdersInput: {
                    skip: pageSkip,
                    take: pageTake,
                },
            },
            context: {gqlLink: gqlLinks.customer},
        },
    );
    const [updateMeMutation, updateMeMutationOptions] = useMutation<UpdateMeData, UpdateMeVars>(UPDATE_ME_MUTATION,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const [cancelOrderMutation, cancelOrderMutationOptions] = useMutation<CancelOrderData, CancelOrderVars>(CANCEL_ORDER_MUTATION,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const [updateEmailMutation, updateEmailMutationOptions] = useMutation<UpdateEmailData, UpdateEmailVars>(UPDATE_EMAIL_MUTATION,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const [updatePasswordMutation, updatePasswordMutationOptions] = useMutation<UpdatePasswordData, UpdatePasswordVars>(UPDATE_PASSWORD_MUTATION,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const [isChangeEmailVisible, setIsChangeEmailVisible] = useState(false);
    const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
    const [updateEmailForm] = useForm();
    const [updatePasswordForm] = useForm();

    useEffect(() => {
        if (getMyOrdersQuery.data?.getMyOrders) {
            setMyOrdersObj(getMyOrdersQuery.data?.getMyOrders);
        }
    }, [getMyOrdersQuery.data?.getMyOrders]);

    const onPersonalDataFinish = async (values: {
        firstName: string,
        lastName: string,
    }) => {
        const response = await updateMeMutation({
            variables: {
                updateMeInput: {...values},
            },
        });
        if (response.data && !response.errors) {
            dispatch(login(response.data.updateMe))
            message.success('Personal data successfully updates');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const OrderHeader: FC<{ order: Order }> = ({order}) => {
        let createdAt = order.createdAt.split('T').join(' ');
        createdAt = createdAt.substr(0, createdAt.length - 5);
        return (
            <div className={s.orderHeader}>
                <div className={s.orderHeaderInfo}>
                    <div>
                        <div>#{order.id}</div>
                        <div>{createdAt}</div>
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

    const clickCancelOrderHandler = async (orderId: number) => {
        const response = await cancelOrderMutation({
            variables: {id: orderId},
        });
        if (!response.errors) {
            message.success('Order successfully canceled');
            const newOrders = myOrdersObj.orders?.map(order => order.id === orderId ? {
                ...order,
                orderStatus: response.data?.cancelOrder.orderStatus,
            } : order);
            setMyOrdersObj({total: myOrdersObj.total, orders: newOrders as Order[]});
        } else {
            response.errors.map(error => message.error(error.message));
        }
    };

    const changeEmailHandler = async () => {
        const email = updateEmailForm.getFieldValue('email');
        updateEmailMutation({variables: {updateEmailInput: {email: email}}})
            .then(response => {
                dispatch(logout());
                setIsChangeEmailVisible(false);
                message.success(response.data?.updateEmail);
            })
            .catch(error => {
                updateEmailForm.setFields([
                    {
                        name: 'email',
                        errors: [error.message],
                    },
                ]);
            });
    };

    const changePasswordHandler = async () => {
        const oldPassword = updatePasswordForm.getFieldValue('oldPassword');
        const newPassword = updatePasswordForm.getFieldValue('newPassword');
        updatePasswordMutation({
            variables: {
                updatePasswordInput: {oldPassword, newPassword},
            },
        })
            .then(response => {
                updatePasswordForm.setFields([{name: 'oldPassword', value: ''}]);
                updatePasswordForm.setFields([{name: 'newPassword', value: ''}]);
                setIsChangePasswordVisible(false);
                message.success('Password successfully changed');
            })
            .catch(error => {
                updatePasswordForm.setFields([
                    {
                        name: 'oldPassword',
                        errors: [error.message],
                    },
                ]);
            });
    };

    if (getMyOrdersQuery.error)
        return <Error/>;

    if (!isAuth)
        return <Navigate to={'/auth/login'}/>;

    if (getMyOrdersQuery.loading)
        return <Loading/>;

    return (
        <div>
            <Tabs type="card">
                <Tabs.TabPane tab="Account" key="1" className={s.tabPane}>
                    <Card title="Personal data" bordered={true}>
                        <Form name="updatePersonalData" onFinish={onPersonalDataFinish}
                              initialValues={{
                                  firstName: authData?.user.firstName,
                                  lastName: authData?.user.lastName,
                              }}>
                            <Form.Item
                                name="firstName"
                                label="FirstName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your firstName',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="FirstName"/>
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                label="LastName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your lastName',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input placeholder="LastName"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType={'submit'} loading={updateMeMutationOptions.loading}>
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <Card title="Security" bordered={true}>
                        <div className={s.changeEmailAndPass}>
                            <div>
                                <div style={{marginBottom: '5px'}}>Email: {authData?.user.email}</div>
                                <Button type={'primary'} onClick={() => setIsChangeEmailVisible(true)}
                                        icon={<FormOutlined/>}>
                                    Change
                                </Button>
                                <Modal title="Change email" visible={isChangeEmailVisible} onOk={changeEmailHandler}
                                       onCancel={() => setIsChangeEmailVisible(false)}
                                       confirmLoading={updateEmailMutationOptions.loading}
                                >
                                    <Form name="updateEmail" form={updateEmailForm}
                                          initialValues={{
                                              email: authData?.user.email,
                                          }}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your email',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Email" type={'email'}/>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </div>
                            <div>
                                <Button type={'primary'} onClick={() => setIsChangePasswordVisible(true)}
                                        icon={<FormOutlined/>}>
                                    Change password
                                </Button>
                                <Modal title="Change password" visible={isChangePasswordVisible}
                                       onOk={changePasswordHandler}
                                       onCancel={() => setIsChangePasswordVisible(false)}
                                       confirmLoading={updatePasswordMutationOptions.loading}
                                >
                                    <Form name="updatePassword" form={updatePasswordForm}>
                                        <Form.Item
                                            name="oldPassword"
                                            label="Old password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your old password',
                                                    whitespace: true,
                                                },
                                                {
                                                    min: 3,
                                                    message: 'Length of password must be more then 2 symbols',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Old password" type={'password'}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="newPassword"
                                            label="New password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your new password',
                                                    whitespace: true,
                                                },
                                                {
                                                    min: 3,
                                                    message: 'Length of password must be more then 2 symbols',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="New password" type={'password'}/>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </div>
                        </div>
                    </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Orders" key="2">
                    <Collapse expandIconPosition={'right'} className={s.orders}>
                        {myOrdersObj?.orders?.map(order => (
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
                    <Pagination total={myOrdersObj.total}
                                onChange={async (pageNumber) => {
                                    const pageSkip = (pageNumber - 1) * pageTake;
                                    setPageSkip(pageSkip);
                                    await getMyOrdersQuery.refetch({
                                        getOrdersInput: {
                                            skip: pageSkip,
                                            take: pageTake,
                                        },
                                    });
                                }}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
        ;
};
