import {useMutation, useQuery} from '@apollo/client';
import {Avatar, Button, Carousel, Divider, message, Switch, Table, Tag} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {GET_PRODUCTS_QUERY, GetProductsData, getProductsObject, GetProductsVars} from '../../gql/products-query';
import {Product} from '../../../types/types';
import {
    REMOVE_PRODUCT_MUTATION,
    RemoveProductData,
    RemoveProductVars,
    UPDATE_PRODUCT_MUTATION,
    UpdateProductData,
    UpdateProductVars,
} from '../../gql/products-mutation';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import s from './ProductsIndex.module.css';
import {updateFileInput} from '../../gql/files-mutation';
import {gqlLinks} from '../../../common-area/gql/client';
import {updateCategoryInput} from '../../gql/categories-mutation';

export const ProductsIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(
        GET_PRODUCTS_QUERY,
        {
            variables: {getProductsInput: {skip: pageSkip, take: pageTake, likeName: ''}},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeProduct, removeProductOptions] = useMutation<RemoveProductData, RemoveProductVars>(REMOVE_PRODUCT_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const [updateProduct, updateProductOptions] = useMutation<UpdateProductData, UpdateProductVars>(UPDATE_PRODUCT_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [productsObj, setProductsObj] = useState<getProductsObject>({products: [], total: 0});

    useEffect(() => {
        if (getProductsQuery.data?.getProducts)
            setProductsObj(getProductsQuery.data.getProducts);
    }, [getProductsQuery.data?.getProducts]);

    const onRemove = async (slug: string) => {
        const response = await removeProduct({variables: {slug: slug}});
        if (response.data)
            await getProductsQuery.refetch({getProductsInput: {skip: pageSkip, take: pageTake, likeName: ''}});
        else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedProducts(selectedRows);
        },
    };

    const toggleIsShownHandler = async (product: Product, flag: boolean) => {
        const {slug, categories, ...rest} = product;
        rest.isShown = flag;
        const files: updateFileInput[] = product.files.map(file => {
            const {fileImage, filePath, ...rest} = file;
            return rest;
        });
        const categoriesWithoutExtra: updateCategoryInput[] = categories.map(category => {
            const {slug, products, ...rest} = category;
            return rest;
        });
        const response = await updateProduct({
            variables: {
                updateProductInput: {
                    ...rest,
                    files: files,
                    categories: categoriesWithoutExtra,
                },
            },
        });
        if (!response.errors) {
            const newProducts = productsObj.products.map(product => (product.id == response.data?.updateProduct.id ? response.data.updateProduct : product));
            setProductsObj({products: newProducts, total: productsObj.total});
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, product: Product) => <>#{product.id}</>,
        },
        {
            title: 'Is shown',
            dataIndex: 'isShown',
            key: 'isShown',
            render: (text: any, product: Product) => (
                <Switch size={'small'} checked={product.isShown}
                        onChange={(flag) => toggleIsShownHandler(product, flag)}/>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'fileImage',
            key: 'fileImage',
            render: (text: any, product: Product) => (
                <Carousel className={s.carousel}>
                    {product.files?.map(file => (
                        <Avatar key={file.id} className={s.image} shape={'square'} size={64} src={file.fileImage}
                                alt={file.fileName}/>
                    ))}
                </Carousel>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
            render: (text: any, product: Product) => (
                <div className={s.categories}>
                    {product?.categories?.length > 0 && product.categories.map(category => (
                        <Tag color="cyan" key={category.id}>
                            <Link to={`../../categories/${category.slug}`}>{category.name} </Link>
                        </Tag>
                    ))}
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'priceUAH',
            key: 'priceUAH',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, product: Product) => (
                <ButtonsVUR viewUrl={`${product.slug}`} updateUrl={`update/${product.slug}`}
                            onRemove={() => onRemove(product.slug)}/>
            ),
        },
    ];

    if (getProductsQuery.loading)
        return <Loading/>;

    if (getProductsQuery.error)
        message.error(getProductsQuery.error.message);

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Products</header>
                    <Link to={'create'}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <strong>search</strong>
            </div>
            <Divider/>
            <div>
                <Table
                    loading={getProductsQuery.loading || removeProductOptions.loading || updateProductOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={productsObj.products}
                    pagination={{
                        total: productsObj.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await getProductsQuery.refetch({
                                getProductsInput: {
                                    skip: pageSkip,
                                    take: pageTake,
                                    likeName: '',
                                },
                            });
                        },
                    }}
                    rowKey={'id'}
                />
            </div>
        </>
    );
};

