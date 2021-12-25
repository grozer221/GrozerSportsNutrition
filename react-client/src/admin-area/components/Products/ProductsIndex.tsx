import {useMutation, useQuery} from '@apollo/client';
import {Button, Divider, Table} from 'antd';
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../../../components/Loading/Loading';
import {GET_PRODUCTS_QUERY, GetProductsData, GetProductsVars} from '../../GraphQL/products-query';
import {Product} from '../../../types/types';
import {REMOVE_PRODUCTS_MUTATION, RemoveProductsData, RemoveProductsVars} from '../../GraphQL/products-mutation';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';

export const ProductsIndex: FC = () => {
    const {loading, error, data, refetch} = useQuery<GetProductsData, GetProductsVars>(
        GET_PRODUCTS_QUERY,
        {variables: {getProductsInput: {skip: 0, take: 10}}},
    );
    const [removeProduct, removeProductOptions] = useMutation<RemoveProductsData, RemoveProductsVars>(REMOVE_PRODUCTS_MUTATION);

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);

    // const [visibleRemove, setVisibleRemove] = useState(false);
    // const [productRemove, setProductRemove] = useState<Product | null>(null);

    const onRemove = async (id: number) => {
        const response = await removeProduct({variables: {id: id}});
        if (response.data)
            await refetch({getProductsInput: {skip: pageSkip, take: pageTake}});
        else
            console.log(response.errors);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedProducts(selectedRows);
        },
    };

    const columns = [
        // {
        //     title: 'Image',
        //     render: (text: any, file: FileType) => {
        //         if (file.mimetype.match(/image/)?.length)
        //             return (
        //                 <Avatar size={48} shape={'square'} src={urls.server + file.destination + '/' + file.fileName}/>
        //             );
        //         return (
        //             <Avatar size={48} shape={'square'} src={urls.server + 'static/images/file.png'}/>
        //         );
        //
        //     },
        // },
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            render: (text: any, product: Product) => (
                <ButtonsVUR viewUrl={`${product.id}`} updateUrl={`update/${product.id}`}
                            onRemove={() => onRemove(product.id)}/>
            ),
        },
    ];

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    return (
        <>
            <Link to={'create'}>
                <Button>Create</Button>
            </Link>
            <Divider/>
            <div>
                <Table
                    loading={loading || removeProductOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={data?.getProducts.products.map(products => ({key: products.id, ...products}))}

                    pagination={{
                        total: data?.getProducts.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await refetch({getProductsInput: {skip: pageSkip, take: pageTake}});
                        },
                        onShowSizeChange: async (pageNumber, pageSize) => {
                            setPageTake(pageSize);
                            await refetch({getProductsInput: {skip: (pageNumber - 1) * pageTake, take: pageTake}});
                        },
                    }}
                />
            </div>
        </>
    );
};

