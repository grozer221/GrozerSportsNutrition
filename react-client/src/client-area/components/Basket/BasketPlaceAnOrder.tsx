import React, {useCallback, useEffect, useState} from 'react';
import {AutoComplete, Button, Form, Input, Radio, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {s_getAuthData} from '../../../redux/auth-selectors';
import {ShippingMethod} from '../../../types/types';
import Search from 'antd/es/input/Search';
import {
    s_getCities,
    s_getCitiesError,
    s_getCitiesLoading,
    s_getWarehouses,
    s_getWarehousesLoading,
} from '../../../redux/nova-poshta.selectors';
import debounce from 'lodash.debounce';
import {actions, loadCities, loadWarehouses} from '../../../redux/nova-poshta-reducer';
import {message} from 'antd/es';
import {useMutation} from '@apollo/client';
import {CREATE_ORDER_MUTATION, CreateOrderData, CreateOrderVars} from '../../gql/orders-mutation';
import {s_getProductsInBasket} from '../../../redux/basket.selectors';
import {gqlLinks} from '../../../common-area/gql/client';
import {Navigate, useNavigate} from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 16, offset: 4},
    },
};

export const BasketPlaceAnOrder = () => {
    const [form] = Form.useForm();
    const authData = useSelector(s_getAuthData);
    const dispatch = useDispatch();
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(ShippingMethod.warehouse);
    const cities = useSelector(s_getCities);
    const warehouses = useSelector(s_getWarehouses);
    const citiesLoading = useSelector(s_getCitiesLoading);
    const warehousesLoading = useSelector(s_getWarehousesLoading);
    const [selectedCity, setSelectedCity] = useState<{ value?: string, deliveryCity?: string } | null>(null);
    const [createOrderMutation, createOrderMutationOption] = useMutation<CreateOrderData, CreateOrderVars>(CREATE_ORDER_MUTATION,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const productsInBasket = useSelector(s_getProductsInBasket);
    const citiesError = useSelector(s_getCitiesError);
    const navigate = useNavigate();

    useEffect(() => {
        if (citiesError) {
            form.setFields([
                {
                    name: 'city',
                    errors: [citiesError],
                },
            ]);
            dispatch(actions.setCitiesError(null));
        }
    }, [citiesError]);

    const onFinish = async (values: {
        email: string, phoneNumber: string,
        firstName: string, lastName: string,
        shippingMethod: ShippingMethod, address: string, city: string, warehouse: string
    }) => {
        const {city, warehouse, address, ...restValues} = values;
        console.log('Received values of form: ', values);
        let newAddress = values.address;
        if (shippingMethod === 'warehouse')
            newAddress = values.city + ' ' + values.warehouse;
        createOrderMutation({
            variables: {
                createOrderInput: {
                    ...restValues,
                    address: newAddress,
                    deliveryCityCode: selectedCity?.deliveryCity as string,
                    deliveryCityName: selectedCity?.value as string,
                    deliveryWarehouse: warehouse,
                    createProductInOrder: productsInBasket.map(productsInBasket => ({
                        productId: productsInBasket.product.id,
                        productQuantity: productsInBasket.productQuantity,
                    })),
                },
            },
        })
            .then(response => {
                dispatch(actions.clearState());
                message.success('Order successfully created');
                navigate('/');
            })
            .catch(error => {
                message.error(error.message);
            });
    };

    const onSearchCityHandler = async (value: string) => {
        dispatch(actions.setWarehouses([]));
        dispatch(actions.setCities([]));
        setSelectedCity(null);
        form.setFields([{
            name: 'department',
            value: '',
        }]);
        value.trim() === '' || dispatch(loadCities(value));
    };

    const debouncedSearchCityHandler = useCallback(debounce(nextValue => onSearchCityHandler(nextValue), 500), []);
    const searchCityHandler = (value: string) => debouncedSearchCityHandler(value);

    const selectCityHandler = (value: string, option: any) => {
        console.log(option);
        setSelectedCity(option);
        dispatch(loadWarehouses(option.deliveryCity));
    };

    if (!productsInBasket.length) {
        return <Navigate to={'/'}/>;
    }

    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="place-an-order"
                onFinish={onFinish}
                initialValues={{
                    email: authData?.user.email,
                    firstName: authData?.user.firstName,
                    lastName: authData?.user.lastName,
                    shippingMethod: shippingMethod,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder={'E-mail'} type={'email'}/>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="PhoneNumber"
                    rules={[{required: true, message: 'Please input your PhoneNumber!', whitespace: true}]}
                >
                    <Input placeholder={'+38 (099) 999-99-99'}/>
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label="FirstName"
                    rules={[{required: true, message: 'Please input your FirstName!', whitespace: true}]}
                >
                    <Input placeholder={'FirstName'}/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="LastName"
                    rules={[{required: true, message: 'Please input your LastName!', whitespace: true}]}
                >
                    <Input placeholder={'LastName'}/>
                </Form.Item>
                <Form.Item
                    label="Shipping method"
                    name="shippingMethod"
                >
                    <Radio.Group onChange={(e) => setShippingMethod(e.target.value)}>
                        <Radio value="warehouse">To the NovaPoshta office - at the NP rate</Radio>
                        <Radio value="courier">Courier of NovaPoshta at the address - 99 UAH</Radio>
                    </Radio.Group>
                </Form.Item>
                {shippingMethod === 'warehouse'
                    ? (
                        <>
                            <Form.Item
                                name="city"
                                label="City"
                                rules={[{required: true, message: 'Please select your city!'}]}
                            >
                                <AutoComplete
                                    options={cities.map(city => ({
                                        value: city.Present,
                                        deliveryCity: city.DeliveryCity,
                                    }))}
                                    onSearch={searchCityHandler}
                                    onSelect={selectCityHandler}
                                >
                                    <Search placeholder="Search city" enterButton loading={citiesLoading}/>
                                </AutoComplete>
                            </Form.Item>
                            {selectedCity && (
                                <Form.Item
                                    name="warehouse"
                                    label="Warehouse"
                                    rules={[{required: true, message: 'Please select your warehouse!'}]}
                                >
                                    <Select loading={warehousesLoading}>
                                        {warehouses.map(warehouse => (
                                            <Select.Option
                                                value={warehouse.Description}>{warehouse.Description}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )}
                        </>
                    )
                    : (
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{required: true, message: 'Please select your address!'}]}
                        >
                            <Input placeholder={'Address'}/>
                        </Form.Item>
                    )
                }
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
