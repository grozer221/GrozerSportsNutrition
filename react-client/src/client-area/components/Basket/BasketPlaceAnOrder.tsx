import React, {useCallback, useEffect, useState} from 'react';
import {AutoComplete, Button, Form, Input, Radio, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {s_getAuthData} from '../../../redux/auth-selectors';
import {ShippingMethod} from '../../../types/types';
import Search from 'antd/es/input/Search';
import {
    s_getCities,
    s_getCitiesLoading,
    s_getWarehouses,
    s_getWarehousesLoading,
} from '../../../redux/nova-poshta.selectors';
import debounce from 'lodash.debounce';
import {actions, loadCities, loadWarehouses} from '../../../redux/nova-poshta-reducer';
import {message} from 'antd/es';

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
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('warehouse');
    const cities = useSelector(s_getCities);
    const warehouses = useSelector(s_getWarehouses);
    const citiesLoading = useSelector(s_getCitiesLoading);
    const warehousesLoading = useSelector(s_getWarehousesLoading);
    const [selectedCity, setSelectedCity] = useState<{ value?: string, deliveryCity?: string } | null>(null);

    useEffect(() => {
        return () => {
            dispatch(actions.clearState());
        };
    }, []);

    const onFinish = (values: {
        email: string, phoneNumber: string,
        firstName: string, lastName: string,
        shippingMethod: ShippingMethod, address: string, city: string, warehouse: string
    }) => {
        console.log('Received values of form: ', values);
        let address = values.address;
        if (shippingMethod === 'warehouse') {
            address = values.city + ' ' + values.warehouse;
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
        message.info(value);
        setSelectedCity(option);
        dispatch(loadWarehouses(option.deliveryCity));
    };

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
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
