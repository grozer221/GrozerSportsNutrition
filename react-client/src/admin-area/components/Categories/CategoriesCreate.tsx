import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import debounce from 'lodash.debounce';
import {Loading} from '../../../components/Loading/Loading';
import {Product} from '../../../types/types';
import s from './CategoriesCreate.module.css';
import {PinnedProducts} from '../../../components/PinnedProducts/PinnedProducts';
import {
    GET_PRODUCT_BY_NAME_QUERY,
    GET_PRODUCTS_QUERY,
    GetProductByNameData,
    GetProductByNameVars,
    GetProductsData,
    GetProductsVars,
} from '../../GraphQL/products-query';
import {CREATE_CATEGORY_MUTATION, CreateCategoryData, CreateCategoryVars} from '../../GraphQL/categories-mutation';
import {WysiwygEditor} from '../../../components/WysiwygEditor/WysiwygEditor';

export const CategoriesCreate: FC = () => {
    const [createCategory, createCategoryOptions] = useMutation<CreateCategoryData, CreateCategoryVars>(CREATE_CATEGORY_MUTATION);
    const getProductByName = useQuery<GetProductByNameData, GetProductByNameVars>(GET_PRODUCT_BY_NAME_QUERY);
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY);
    const navigate = useNavigate();
    const [products, setProducts] = useState([] as Product[]);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [isShown, setIsShown] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');

    const onFinish = async (values: {
        name: string,
    }) => {
        const productsWithoutFiles = products.map(product => {
            const {files, categories, ...rest} = product;
            return rest;
        });
        const response = await createCategory({
            variables: {
                createCategoryInput: {
                    ...values,
                    isShown,
                    description: description,
                    products: productsWithoutFiles,
                },
            },
        });
        if (!response.errors) {
            navigate('..');
        } else
            console.log(response.errors);
    };

    const onSearch = async (value: string) => {
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
            if (!response.data.getProducts.products.length) {
                message.warning('Products with current name not found');
            }
        } else {
            console.log(response.errors);
        }
    };

    const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    const handleSearch = (value: string) => debouncedSearch(value);

    const selectProductHandler = async (value: string) => {
        if (products.some(product => product.name === value)) {
            message.warning('You already added this product');
            return;
        }
        const response = await getProductByName.refetch({
            name: value,
        });
        if (!response.errors) {
            setProducts([...products, response.data.getProductByName]);
        } else {
            console.log(response.errors);
        }
    };

    return (
        <Form name="createCategory" onFinish={onFinish}>
            <Form.Item
                name="isShown"
                label="Is shown"
            >
                <Switch size={'small'} checked={isShown} onChange={setIsShown}/>
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
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item label={'Description'}>
                <WysiwygEditor text={description} setText={setDescription}/>
            </Form.Item>
            <Form.Item
                label="Products"
            >
                <div className={s.photosAdd}>
                    <AutoComplete
                        options={options}
                        placeholder="Search in products"
                        onSearch={handleSearch}
                        onSelect={selectProductHandler}
                    />
                    <div className={s.wrapperLoading}>
                        {(getProductsQuery.loading || getProductByName.loading) && <Loading/>}
                    </div>
                </div>
            </Form.Item>
            {products.length > 0 && (
                <Form.Item>
                    <PinnedProducts products={products} setProducts={setProducts}
                                    loading={createCategoryOptions.loading}/>
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={createCategoryOptions.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
