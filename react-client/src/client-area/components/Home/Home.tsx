import React, {FC} from 'react';
import s from './Home.module.css';
import {useQuery} from '@apollo/client';
import {gqlLinks} from '../../../common-area/gql/client';
import {
    GET_PRODUCTS_HIT_OF_SALES_QUERY,
    GetProductsHitOfSalesData,
    GetProductsHitOfSalesVars,
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

    if (getProductsHitOfSalesQuery.error) {
        message.error(getProductsHitOfSalesQuery.error.message);
    }

    if (getProductsHitOfSalesQuery.loading)
        return <Loading/>;

    if (getProductsHitOfSalesQuery.data)
        return (
            <div>
                <div className={s.hitOfSalesWrapper}>
                    <div className={s.hitOfSalesTitle}>
                        <h2 className={'bold'}>Hit of sales</h2>
                    </div>
                    <Carousel show={3.5} slide={3} swiping={true}>
                        {getProductsHitOfSalesQuery.data.getProductsHitOfSales.map(productHitOfSalesQuery => (
                            <ProductCard product={productHitOfSalesQuery}/>
                        ))}
                    </Carousel>
                </div>
            </div>
        );

    return null;
};
