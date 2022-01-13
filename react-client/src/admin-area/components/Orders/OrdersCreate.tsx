import React, {useCallback, useEffect, useState} from 'react';
import {AutoComplete, Button, Form, Input, Radio, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
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
import {actions as basketActions} from '../../../redux/basket-reducer';
import {message} from 'antd/es';
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_ORDER_MUTATION, CreateOrderData, CreateOrderVars} from '../../gql/orders-mutation';
import {s_getProductsInBasket} from '../../../redux/basket.selectors';
import {gqlLinks} from '../../../common-area/gql/client';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {
    GET_PRODUCT_BY_NAME_QUERY,
    GET_PRODUCTS_QUERY,
    GetProductByNameData,
    GetProductByNameVars,
    GetProductsData,
    GetProductsVars,
} from '../../gql/products-query';
import {PinnedProductsInOrder} from '../../../common-area/components/PinnedProductsInOrder/PinnedProductsInOrder';
import {useNavigate} from 'react-router-dom';

export const OrdersCreate = () => {
    const [form] = Form.useForm();
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
    const citiesError = useSelector(s_getCitiesError);

    const productsInBasket = useSelector(s_getProductsInBasket);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const getProductByName = useQuery<GetProductByNameData, GetProductByNameVars>(GET_PRODUCT_BY_NAME_QUERY,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY,
        {context: {gqlLink: gqlLinks.admin}},
    );
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

        return () => {
            dispatch(actions.clearState());
            dispatch(basketActions.clearState());
        };
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
        const response = await createOrderMutation({
            variables: {
                createOrderInput: {
                    ...restValues,
                    address: newAddress,
                    deliveryCityName: selectedCity?.value as string,
                    deliveryCityCode: selectedCity?.deliveryCity as string,
                    deliveryWarehouse: warehouse,
                    createProductInOrder: productsInBasket.map(productInBasket => ({
                        productId: productInBasket.product.id,
                        productQuantity: productInBasket.productQuantity,
                    })),
                },
            },
        });
        if (!response.errors) {
            message.success('Order successfully created');
            navigate('../');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
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
        setSelectedCity(option);
        dispatch(loadWarehouses(option.deliveryCity));
    };

    const onSearchProductHandler = async (value: string) => {
        if (value.trim() === '') {
            setOptions([]);
            return;
        }
        const response = await getProductsQuery.refetch({
            getProductsInput: {
                skip: 0,
                take: 5,
                likeName: value,
            },
        });
        if (!response.errors) {
            setOptions(response.data.getProducts.products.map(product => ({value: product.name})));
            if (!response.data.getProducts.total) {
                message.warning('Product with current name not found');
            }
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const debouncedSearchProductHandler = useCallback(debounce(nextValue => onSearchProductHandler(nextValue), 500), []);
    const searchProductHandler = (value: string) => debouncedSearchProductHandler(value);

    const selectProductHandler = async (value: string, options: any) => {
        if (productsInBasket.some(productInBasket => productInBasket.product.name === value)) {
            message.warning('You already added this product');
            return;
        }
        console.log('selected: ' + value);
        const response = await getProductByName.refetch({
            name: value,
        });
        if (!response.errors) {
            dispatch(basketActions.addProductToBasket(response.data.getProductByName));
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    return (
        <div>
            <Form
                {...sizeFormItem}
                form={form}
                name="createOrder"
                onFinish={onFinish}
                initialValues={{
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
                    <Input placeholder={'E-mail'}/>
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
                <Form.Item label="Products">
                    <AutoComplete
                        options={options}
                        onSearch={searchProductHandler}
                        onSelect={selectProductHandler}
                    >
                        <Search placeholder="Search products" enterButton
                                loading={getProductsQuery.loading || getProductByName.loading}/>
                    </AutoComplete>
                </Form.Item>
                {productsInBasket.length > 0 && (
                    <Form.Item>
                        <PinnedProductsInOrder loading={getProductsQuery.loading || getProductByName.loading}/>
                    </Form.Item>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={createOrderMutationOption.loading}>Create</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
