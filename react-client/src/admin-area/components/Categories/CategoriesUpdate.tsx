import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Loading} from '../../../components/Loading/Loading';
import debounce from 'lodash.debounce';
import {Product} from '../../../types/types';
import {GET_CATEGORY_QUERY, GetCategoryData, GetCategoryVars} from '../../GraphQL/categories-query';
import s from './CategoriesUpdate.module.css';
import {PinnedProducts} from '../../../components/PinnedProducts/PinnedProducts';
import {UPDATE_CATEGORY_MUTATION, UpdateCategoryData, UpdateCategoryVars} from '../../GraphQL/categories-mutation';
import {
    GET_PRODUCT_BY_NAME_QUERY,
    GET_PRODUCTS_QUERY,
    GetProductByNameData,
    GetProductByNameVars,
    GetProductsData,
    GetProductsVars,
} from '../../GraphQL/products-query';
import {updateProductWithoutFilesInput} from '../../GraphQL/products-mutation';
import {WysiwygEditor} from '../../../components/WysiwygEditor/WysiwygEditor';

export const CategoriesUpdate: FC = () => {
    const params = useParams();
    const categoryId = params.id ? parseInt(params.id) : 0;
    const getCategoryQuery = useQuery<GetCategoryData, GetCategoryVars>(
        GET_CATEGORY_QUERY,
        {variables: {id: categoryId}},
    );
    const [updateCategory, updateCategoryOption] = useMutation<UpdateCategoryData, UpdateCategoryVars>(UPDATE_CATEGORY_MUTATION);
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY);
    const getProductByNameQuery = useQuery<GetProductByNameData, GetProductByNameVars>(GET_PRODUCT_BY_NAME_QUERY);
    const [products, setProducts] = useState([] as Product[]);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (getCategoryQuery.data?.getCategory) {
            setIsShown(getCategoryQuery.data.getCategory.isShown);
            setProducts(getCategoryQuery.data.getCategory.products);
            setDescription(getCategoryQuery.data.getCategory.description);
        }
    }, [getCategoryQuery.data?.getCategory]);

    const onFinish = async (values: {
        id: string,
        name: string,
    }) => {
        const intId = parseInt(values.id);
        const productsWithoutFiles: updateProductWithoutFilesInput[] = products.map(product => {
            const {files, categories, ...rest} = product;
            return rest;
        });
        const response = await updateCategory({
            variables: {
                updateCategoryInput: {
                    ...values,
                    id: intId,
                    isShown: isShown,
                    description: description,
                    products: productsWithoutFiles,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

    const selectProductHandler = async (value: string) => {
        if (products.some(product => product.name === value)) {
            message.warning('You already added this product');
            return;
        }
        const response = await getProductByNameQuery.refetch({
            name: value,
        });
        if (!response.errors) {
            setProducts([...products, response.data.getProductByName]);
        } else {
            console.log(response.errors);
        }
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

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (getCategoryQuery.loading)
        return <Loading/>;

    if (getCategoryQuery.error)
        console.log(getCategoryQuery.error);

    console.log(getProductsQuery.loading);
    return (
        <Form name="updateCategory" onFinish={onFinish}
              initialValues={{
                  id: getCategoryQuery.data?.getCategory.id,
                  name: getCategoryQuery.data?.getCategory.name,
                  description: getCategoryQuery.data?.getCategory.description,
              }}>
            <Form.Item name="id" className={s.inputId}>
                <Input type={'hidden'} className={s.inputId}/>
            </Form.Item>
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
                <div className={s.productsAdd}>
                    <AutoComplete
                        options={options}
                        placeholder="Find in uploaded files"
                        onSearch={handleSearch}
                        onSelect={selectProductHandler}
                    />
                    <div className={s.wrapperLoading}>
                        {(getProductsQuery.loading || getProductByNameQuery.loading) && <Loading/>}
                    </div>
                </div>
            </Form.Item>
            {products.length > 0 && (
                <Form.Item>
                    <PinnedProducts loading={getCategoryQuery.loading || updateCategoryOption.loading}
                                    products={products} setProducts={setProducts}/>
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType={'submit'}
                        loading={getCategoryQuery.loading || updateCategoryOption.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
