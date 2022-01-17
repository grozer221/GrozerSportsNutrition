import React, {FC} from 'react';
import s from './Home.module.css';
import {useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {
    GET_PRODUCTS_HIT_OF_SALES_QUERY,
    GET_PRODUCTS_NEWEST_QUERY,
    GetProductsHitOfSalesData,
    GetProductsHitOfSalesVars,
    GetProductsNewestData,
    GetProductsNewestVars,
} from '../../gql/products-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {message} from 'antd';
import {ProductCard} from '../Products/ProductCard';
import {Carousel} from '@trendyol-js/react-carousel';

export const Home: FC = () => {
    const getProductsHitOfSalesQuery = useQuery<GetProductsHitOfSalesData, GetProductsHitOfSalesVars>(GET_PRODUCTS_HIT_OF_SALES_QUERY,
        {
            context: {gqlLink: gqlLinks.customer},
        },
    );

    const getProductsNewestQuery = useQuery<GetProductsNewestData, GetProductsNewestVars>(GET_PRODUCTS_NEWEST_QUERY,
        {
            context: {gqlLink: gqlLinks.customer},
        },
    );

    if (getProductsHitOfSalesQuery.error) {
        message.error(getProductsHitOfSalesQuery.error.message);
    }

    if (getProductsNewestQuery.error) {
        message.error(getProductsNewestQuery.error.message);
    }

    if (getProductsHitOfSalesQuery.loading || getProductsNewestQuery.loading)
        return <Loading/>;

    if (getProductsHitOfSalesQuery.data && getProductsNewestQuery.data)
        return (
            <div>
                <div className={s.strongWrapper}>
                    <div className={s.strongTitle}>
                        <h2 className={'bold'}>Hit of sales</h2>
                    </div>
                    <Carousel show={3.5} slide={3} swiping={true}>
                        {getProductsHitOfSalesQuery.data.getProductsHitOfSales.map(productHitOfSalesQuery => (
                            <ProductCard product={productHitOfSalesQuery} key={productHitOfSalesQuery.id}/>
                        ))}
                    </Carousel>
                </div>
                <div className={s.strongWrapper}>
                    <div className={s.strongTitle}>
                        <h2 className={'bold'}>Newest</h2>
                    </div>
                    <Carousel show={3.5} slide={3} swiping={true}>
                        {getProductsNewestQuery.data.getProductsNewest.map(productNewest => (
                            <ProductCard product={productNewest} key={productNewest.id}/>
                        ))}
                    </Carousel>
                </div>
            </div>
        );

    return null;
};
