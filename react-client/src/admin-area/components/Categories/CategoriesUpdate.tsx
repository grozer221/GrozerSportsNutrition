import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Loading} from '../../../common-area/components/Loading/Loading';
import debounce from 'lodash.debounce';
import {Product} from '../../../types/types';
import {GET_CATEGORY_QUERY, GetCategoryData, GetCategoryVars} from '../../gql/categories-query';
import {PinnedProducts} from '../../../common-area/components/PinnedProducts/PinnedProducts';
import {UPDATE_CATEGORY_MUTATION, UpdateCategoryData, UpdateCategoryVars} from '../../gql/categories-mutation';
import {
    GET_PRODUCT_BY_NAME_QUERY,
    GET_PRODUCTS_QUERY,
    GetProductByNameData,
    GetProductByNameVars,
    GetProductsData,
    GetProductsVars,
} from '../../gql/products-query';
import {updateProductWithoutFilesInput} from '../../gql/products-mutation';
import {WysiwygEditor} from '../../../common-area/components/WysiwygEditor/WysiwygEditor';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';

const {Search} = Input;

export const CategoriesUpdate: FC = () => {
    const params = useParams();
    const categorySlug = params.slug || '';
    const getCategoryQuery = useQuery<GetCategoryData, GetCategoryVars>(
        GET_CATEGORY_QUERY,
        {
            variables: {slug: categorySlug},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [updateCategory, updateCategoryOption] = useMutation<UpdateCategoryData, UpdateCategoryVars>(UPDATE_CATEGORY_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    // const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY,
    //     {context: {gqlLink: gqlLinks.admin}},
    // );
    // const getProductByNameQuery = useQuery<GetProductByNameData, GetProductByNameVars>(GET_PRODUCT_BY_NAME_QUERY,
    //     {context: {gqlLink: gqlLinks.admin}},
    // );
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);
    // const [options, setOptions] = useState<{ value: string }[]>([]);
    // const [products, setProducts] = useState([] as Product[]);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (getCategoryQuery.data?.getCategory) {
            setIsShown(getCategoryQuery.data.getCategory.isShown);
            // setProducts(getCategoryQuery.data.getCategory.products);
            setDescription(getCategoryQuery.data.getCategory.description);
        }
    }, [getCategoryQuery.data?.getCategory]);

    const onFinish = async (values: {
        id: string,
        name: string,
    }) => {
        const intId = parseInt(values.id);
        // const productsWithoutFiles: updateProductWithoutFilesInput[] = products.map(product => {
        //     const {files, categories, slug, ...rest} = product;
        //     return rest;
        // });
        const response = await updateCategory({
            variables: {
                updateCategoryInput: {
                    ...values,
                    id: intId,
                    isShown: isShown,
                    description: description,
                    // products: productsWithoutFiles,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    // const selectProductHandler = async (value: string) => {
    //     if (products.some(product => product.name === value)) {
    //         message.warning('You already added this product');
    //         return;
    //     }
    //     const response = await getProductByNameQuery.refetch({
    //         name: value,
    //     });
    //     if (!response.errors) {
    //         setProducts([...products, response.data.getProductByName]);
    //     } else {
    //         response.errors?.forEach(error => message.error(error.message));
    //     }
    // };

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
    //
    // const debouncedSearchProductHandler = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    // const searchProductHandler = (value: string) => debouncedSearchProductHandler(value);

    if (!categorySlug || getCategoryQuery.error)
        return <Error/>;

    if (getCategoryQuery.loading)
        return <Loading/>;

    return (
        <Form name="updateCategory" onFinish={onFinish}
              initialValues={{
                  id: getCategoryQuery.data?.getCategory.id,
                  name: getCategoryQuery.data?.getCategory.name,
                  description: getCategoryQuery.data?.getCategory.description,
              }}>
            <Form.Item name="id" style={{display: 'none'}}>
                <Input type={'hidden'}/>
            </Form.Item>
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
            {/*        onSearch={searchProductHandler}*/}
            {/*        onSelect={selectProductHandler}*/}
            {/*    >*/}
            {/*        <Search placeholder="Find in products" enterButton*/}
            {/*                loading={getProductsQuery.loading || getProductByNameQuery.loading}/>*/}
            {/*    </AutoComplete>*/}
            {/*</Form.Item>*/}
            {/*{products.length > 0 && (*/}
            {/*    <Form.Item>*/}
            {/*        <PinnedProducts loading={getCategoryQuery.loading || updateCategoryOption.loading}*/}
            {/*                        products={products} setProducts={setProducts}/>*/}
            {/*    </Form.Item>*/}
            {/*)}*/}
            <Form.Item>
                <Button type="primary" htmlType={'submit'}
                        loading={getCategoryQuery.loading || updateCategoryOption.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
