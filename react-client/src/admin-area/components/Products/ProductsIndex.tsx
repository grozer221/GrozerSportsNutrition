import {useMutation, useQuery} from '@apollo/client';
import {Avatar, Button, Carousel, Divider, Switch, Table} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../../../components/Loading/Loading';
import {GET_PRODUCTS_QUERY, GetProductsData, getProductsObject, GetProductsVars} from '../../GraphQL/products-query';
import {Product} from '../../../types/types';
import {
    REMOVE_PRODUCTS_MUTATION,
    RemoveProductsData,
    RemoveProductsVars,
    UPDATE_PRODUCTS_MUTATION,
    UpdateProductsData,
    UpdateProductsVars,
} from '../../GraphQL/products-mutation';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import s from './ProductsIndex.module.css';
import {updateFileInput} from '../../GraphQL/files-mutation';

export const ProductsIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(
        GET_PRODUCTS_QUERY,
        {variables: {getProductsInput: {skip: pageSkip, take: pageTake, likeName: ''}}},
    );
    const [productsObj, setProductsObj] = useState<getProductsObject>({products: [], total: 0});
    const [removeProduct, removeProductOptions] = useMutation<RemoveProductsData, RemoveProductsVars>(REMOVE_PRODUCTS_MUTATION);
    const [updateProduct, updateProductOptions] = useMutation<UpdateProductsData, UpdateProductsVars>(UPDATE_PRODUCTS_MUTATION);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (getProductsQuery.data?.getProducts)
            setProductsObj(getProductsQuery.data.getProducts);
    }, [getProductsQuery.data?.getProducts]);

    const onRemove = async (id: number) => {
        const response = await removeProduct({variables: {id: id}});
        if (response.data)
            await getProductsQuery.refetch({getProductsInput: {skip: pageSkip, take: pageTake, likeName: ''}});
        else
            console.log(response.errors);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedProducts(selectedRows);
        },
    };

    const toggleIsShownHandler = async (product: Product, flag: boolean) => {
        product.isShown = flag;
        // @ts-ignore
        const {key, categories, ...rest} = product;
        const files: updateFileInput[] = product.files.map(file => {
            const {fileImage, filePath, ...rest} = file;
            return rest;
        });
        const response = await updateProduct({
            variables: {
                updateProductInput: {
                    ...rest,
                    files: files,
                },
            },
        });
        if (!response.errors) {
            const newProducts = productsObj.products.map(product => (product.id == response.data?.updateProduct.id ? response.data.updateProduct : product));
            setProductsObj({products: newProducts, total: productsObj.total});
        } else {
            console.log(response.errors);
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text: any, product: Product) => <>#{product.id}</>,
        },
        {
            title: 'Is shown',
            dataIndex: 'isShown',
            render: (text: any, product: Product) => (
                <Switch size={'small'} checked={product.isShown}
                        onChange={(flag) => toggleIsShownHandler(product, flag)}/>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'fileImage',
            render: (text: any, product: Product) => (
                <Carousel className={s.carousel}>
                    {product.files.map(file => (
                        <div>
                            <Avatar className={s.image} shape={'square'} size={64} src={file.fileImage}
                                    alt={file.fileName}/>
                        </div>
                    ))}
                </Carousel>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'priceUAH',
        },
        {
            title: 'Actions',
            render: (text: any, product: Product) => (
                <ButtonsVUR viewUrl={`${product.id}`} updateUrl={`update/${product.id}`}
                            onRemove={() => onRemove(product.id)}/>
            ),
        },
    ];

    if (getProductsQuery.loading)
        return <Loading/>;

    if (getProductsQuery.error)
        console.log(getProductsQuery.error);

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
                    dataSource={productsObj.products.map(products => ({key: products.id, ...products}))}

                    pagination={{
                        total: productsObj.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await getProductsQuery.refetch({getProductsInput: {skip: pageSkip, take: pageTake, likeName: ''}});
                        },
                        // onShowSizeChange: async (pageNumber, pageSize) => {
                        //     setPageTake(pageSize);
                        //     await refetch({getProductsInput: {skip: (pageNumber - 1) * pageTake, take: pageTake}});
                        // },
                    }}
                />
            </div>
        </>
    );
};

