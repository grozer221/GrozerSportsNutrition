import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_PRODUCTS_QUERY, GetProductsData, GetProductsVars} from '../../gql/products-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {ProductCard} from './ProductCard';
import s from './ProductsIndex.module.css';

export const ProductsIndex = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY,
        {
            variables: {
                getProductsInput: {
                    take: pageTake,
                    skip: pageSkip,
                    likeName: '',
                },
            },
            context: {gqlLink: gqlLinks.customer},
        },
    );

    if (getProductsQuery.loading)
        return <Loading/>;

    return (
        <div className={s.products}>
            {getProductsQuery.data?.getProducts.products.map(product => (
                <ProductCard product={product}/>
            ))}
        </div>
    );
};
