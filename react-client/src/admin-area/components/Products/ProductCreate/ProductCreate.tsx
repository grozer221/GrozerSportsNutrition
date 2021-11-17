import {useMutation} from '@apollo/client';
import {Button, Form, Input} from 'antd';
import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCT_QUERY, CreateProductData, CreateProductVars} from '../../../GraphQL/products-mutation';

export const ProductCreate: FC = () => {
    const [createProduct, {
        data,
        loading,
        error
    }] = useMutation<CreateProductData, CreateProductVars>(CREATE_PRODUCT_QUERY);
    const navigate = useNavigate();

    if (error)
        console.log(error)

    const onFinish = async (values: { name: string }) => {
        console.log('Received values of form: ', values);
        const response = await createProduct({variables: {createProductInput: {...values}}});
        console.log(response)
        if (response.data && !response.errors) {
            navigate('/admin/products')
        } else
            console.log('error:', error)
    };

    return (
        <Form name="createProduct" onFinish={onFinish}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name',
                    },
                ]}
            >
                <Input placeholder="Please input product name"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}
