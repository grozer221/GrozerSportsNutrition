import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_PRODUCTS_QUERY, GetProductsData, getProductsObject, GetProductsVars} from '../../gql/products-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {ProductCard} from './ProductCard';
import s from './ProductsIndex.module.css';
import {OrderBy} from '../../../types/types';
import {Select} from 'antd';
import {getStringFromCamelCase} from '../../../utils/stringActions';

export const ProductsIndex = () => {
    const [pageTake, setPageTake] = useState(16);
    const [pageSkip, setPageSkip] = useState(0);
    const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.newest);
    const getProductsQuery = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS_QUERY,
        {
            variables: {
                getProductsInput: {
                    take: pageTake,
                    skip: pageSkip,
                    likeName: '',
                    orderBy: orderBy,
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
                    orderBy: orderBy,
                },
            });
        }
    };

    const orderByChangeHandler = async (value: OrderBy) => {
        const newPageSkip = 0;
        setPageSkip(newPageSkip);
        setOrderBy(value);
        setProductsObj({products: [], total: 0});
        await getProductsQuery.refetch({
            getProductsInput: {
                skip: newPageSkip,
                take: pageSkip,
                likeName: '',
                orderBy: value,
            },
        });
    };

    return (
        <div className={s.wrapperProducts} onScroll={productsScrollHandler}>
            <Select defaultValue={orderBy} className={s.orderBy} onChange={orderByChangeHandler}>
                {(Object.keys(OrderBy) as Array<keyof typeof OrderBy>).map((key, i) => (
                    <Select.Option value={key} key={i}>{getStringFromCamelCase(key)}</Select.Option>
                ))}
            </Select>
            <div className={s.products}>
                {productsObj.products.map(product => (
                    <ProductCard product={product} key={product.id}/>
                ))}
            </div>
            {getProductsQuery.loading && <Loading/>}
        </div>
    );
};
