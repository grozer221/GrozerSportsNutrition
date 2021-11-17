import {useMutation} from '@apollo/client';
import {Button, Form, Input} from 'antd';
import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCT_MUTATION, CreateProductData, CreateProductVars} from '../../../GraphQL/products-mutation';

export const ProductCreate: FC = () => {
    const [createProduct, {
        loading,
    }] = useMutation<CreateProductData, CreateProductVars>(CREATE_PRODUCT_MUTATION);
    const navigate = useNavigate();

    const onFinish = async (values: { name: string }) => {
        console.log('Received values of form: ', values);
        const response = await createProduct({variables: {createProductInput: {...values}}});
        console.log(response);
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
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
                <Input placeholder="Product name"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
