import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_PRODUCTS_QUERY, GetProductsData, getProductsObject, GetProductsVars} from '../../gql/products-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {ProductCard} from './ProductCard';
import s from './ProductsIndex.module.css';

export const ProductsIndex = () => {
    const [pageTake, setPageTake] = useState(12);
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
    const [productsObj, setProductsObj] = useState<getProductsObject>({products: [], total: 0});

    useEffect(() => {
        if (getProductsQuery.data?.getProducts) {
            setProductsObj({
                products: [...productsObj.products, ...getProductsQuery.data.getProducts.products],
                total: getProductsQuery.data.getProducts.total,
            });
        }
    }, [getProductsQuery.data?.getProducts]);

    const productsScrollHandler = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        let scrollPosition = Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight;
        if (scrollPosition < 50 && !getProductsQuery.loading && (pageTake + pageSkip) < productsObj.total) {
            const newPageSkip = pageSkip + pageTake;
            setPageSkip(newPageSkip);
            await getProductsQuery.refetch({
                getProductsInput: {
                    skip: newPageSkip,
                    take: pageTake,
                    likeName: '',
                },
            });
        }
    };

    return (
        <div className={s.products} onScroll={productsScrollHandler}>
            {productsObj.products.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))}
            {getProductsQuery.loading && <Loading/>}
        </div>
    );
};
