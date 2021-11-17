import {useQuery} from '@apollo/client';
import { Button } from 'antd';
import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import {Loading} from '../../../../components/Loading/Loading';
import {GetProductsData, GetProductsVars, GET_PRODUCTS_QUERY} from '../../../GraphQL/products-query';
import s from './ProductsIndex.module.css';

export const ProductsIndex: FC = () => {
    const {loading, error, data} = useQuery<GetProductsData, GetProductsVars>(
        GET_PRODUCTS_QUERY,
        {variables: {getProductsInput: {skip: 0, take: 10}}}
    );
    if (loading)
        return <Loading/>

    if (error)
        console.log(error)

    return (
        <>
            <Link to={'/admin/products/create'}>
                <Button>Create product</Button>
            </Link>
            <ul>
                {data?.getProducts.map(product => (
                    <li key={product.id}>
                        <div>{product.name}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}

