import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import debounce from 'lodash.debounce';
import {Product} from '../../../types/types';
import {PinnedProducts} from '../../../common-area/components/PinnedProducts/PinnedProducts';
import {
    GET_PRODUCT_BY_NAME_QUERY,
    GET_PRODUCTS_QUERY,
    GetProductByNameData,
    GetProductByNameVars,
    GetProductsData,
    GetProductsVars,
} from '../../gql/products-query';
import {CREATE_CATEGORY_MUTATION, CreateCategoryData, CreateCategoryVars} from '../../gql/categories-mutation';
import {WysiwygEditor} from '../../../common-area/components/WysiwygEditor/WysiwygEditor';
import {updateProductWithoutFilesInput} from '../../gql/products-mutation';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {gqlLinks} from '../../../common-area/gql/client';

const {Search} = Input;

export const CategoriesCreate: FC = () => {
    const [createCategory, createCategoryOptions] = useMutation<CreateCategoryData, CreateCategoryVars>(CREATE_CATEGORY_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    // const getProductByName = useQuery<GetProductByNameData, GetProductByNameVars>(GET_PRODUCT_BY_NAME_QUERY,
    //     {context: {gqlLink: gqlLinks.admin}},
    // );
    // const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY,
    //     {context: {gqlLink: gqlLinks.admin}},
    // );
    const navigate = useNavigate();
    // const [products, setProducts] = useState([] as Product[]);
    // const [options, setOptions] = useState<{ value: string }[]>([]);
    const [isShown, setIsShown] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');

    const onFinish = async (values: {
        name: string,
    }) => {
        // const productsWithoutFiles: updateProductWithoutFilesInput[] = products.map(product => {
        //     const {files, categories, ...rest} = product;
        //     return rest;
        // });
        const response = await createCategory({
            variables: {
                createCategoryInput: {
                    ...values,
                    isShown,
                    description: description,
                    // products: productsWithoutFiles,
                },
            },
        });
        if (!response.errors) {
            navigate('..');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    // const onSearch = async (value: string) => {
    //     if (value.trim() === '') {
    //         setOptions([]);
    //         return;
    //     }
    //     const response = await getProductsQuery.refetch({
    //         getProductsInput: {
    //             skip: 0,
    //             take: 5,
    //             likeName: value,
    //         },
    //     });
    //     if (!response.errors) {
    //         setOptions(response.data.getProducts.products.map(product => ({value: product.name})));
    //         if (!response.data.getProducts.products.length) {
    //             message.warning('Products with current name not found');
    //         }
    //     } else {
    //         response.errors?.forEach(error => message.error(error.message));
    //     }
    // };

    // const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    // const handleSearch = (value: string) => debouncedSearch(value);
    //
    // const selectProductHandler = async (value: string) => {
    //     if (products.some(product => product.name === value)) {
    //         message.warning('You already added this product');
    //         return;
    //     }
    //     const response = await getProductByName.refetch({
    //         name: value,
    //     });
    //     if (!response.errors) {
    //         setProducts([...products, response.data.getProductByName]);
    //     } else {
    //         response.errors?.forEach(error => message.error(error.message));
    //     }
    // };

    return (
        <Form name="createCategory" onFinish={onFinish}>
            <Form.Item
                {...sizeFormItem}
                name="isShown"
                label="Is shown"
            >
                <Switch size={'small'} checked={isShown} onChange={setIsShown}/>
            </Form.Item>
            <Form.Item
                {...sizeFormItem}
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name',
                    },
                ]}
            >
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item
                {...sizeFormItem}
                label={'Description'}
            >
                <WysiwygEditor text={description} setText={setDescription}/>
            </Form.Item>
            {/*<Form.Item*/}
            {/*    {...sizeFormItem}*/}
            {/*    label="Products"*/}
            {/*>*/}
            {/*    <AutoComplete*/}
            {/*        options={options}*/}
            {/*        onSearch={handleSearch}*/}
            {/*        onSelect={selectProductHandler}*/}
            {/*    >*/}
            {/*        <Search placeholder="Search in products" enterButton*/}
            {/*                loading={getProductsQuery.loading || getProductByName.loading}/>*/}
            {/*    </AutoComplete>*/}
            {/*</Form.Item>*/}
            {/*{products.length > 0 && (*/}
            {/*    <Form.Item>*/}
            {/*        <PinnedProducts products={products} setProducts={setProducts}*/}
            {/*                        loading={createCategoryOptions.loading}/>*/}
            {/*    </Form.Item>*/}
            {/*)}*/}
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={createCategoryOptions.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
