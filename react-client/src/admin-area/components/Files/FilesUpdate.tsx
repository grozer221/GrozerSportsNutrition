import {useMutation, useQuery} from '@apollo/client';
import {Button, Form, Input} from 'antd';
import React, {FC} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import s from './FilesUpdate.module.css';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../gql/products-query';
import {Loading} from '../../../common-area/components/Loading/Loading';

export const FilesUpdate: FC = () => {
    const params = useParams();

    // const {loading, error, data} = useQuery<GetProductData, GetProductVars>(
    //     GET_PRODUCT_QUERY,
    //     {variables: {id: params.id ? parseInt(params.id) : 0}, context: {gqlLink: gqlLinks.graphqlAdmin}},
    // );
    // const [createProduct] = useMutation<ProductUpdateData, ProductUpdateVars>(PRODUCT_UPDATE_MUTATION, {context: {gqlLink: gqlLinks.graphqlAdmin}});
    const navigate = useNavigate();

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    // if (loading)
    //     return <Loading/>;
    //
    // if (error)
    //     console.log(error);

    const onFinish = async (values: { id: number, name: string }) => {
        console.log('Received values of form: ', values);
        // const response = await createProduct({variables: {updateProductInput: {...values}}});
        // console.log(response);
        // if (response.data && !response.errors) {
        //     navigate('..');
        // } else
        //     console.log('error:', response.errors);
    };

    return (
        <Form name="createProduct" onFinish={onFinish}
              // initialValues={{id: data?.getProduct.id, name: data?.getProduct.name}}
        >
            <Form.Item name="id" className={s.inputId}>
                <Input type={'hidden'} className={s.inputId}/>
            </Form.Item>
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
                <Button type="primary" htmlType={'submit'}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
