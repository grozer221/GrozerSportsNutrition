import {useQuery} from '@apollo/client';
import {Button} from 'antd';
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../../../../components/Loading/Loading';
import {GET_PRODUCTS_QUERY, GetProductsData, GetProductsVars} from '../../../GraphQL/products-query';
import s from './ProductsIndex.module.css';
import {ProductRemove} from '../ProductRemove/ProductRemove';
import {Product} from '../../../../types/types';

export const ProductsIndex: FC = () => {
    const {loading, error, data} = useQuery<GetProductsData, GetProductsVars>(
        GET_PRODUCTS_QUERY,
        {variables: {getProductsInput: {skip: 0, take: 10}}},
    );

    const [visibleRemove, setVisibleRemove] = useState(false);
    const [productRemove, setProductRemove] = useState<Product | null>(null);

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    return (
        <>
            <Link to={'create'}>
                <Button>Create</Button>
            </Link>
            <ul>
                {data?.getProducts.map(product => (
                    <li key={product.id} className={s.product}>
                        <div>
                            <div>{product.name}</div>
                        </div>
                        <div>
                            <Link to={`../${product.id}`}>
                                <Button type={'default'}>View</Button>
                            </Link>
                            <Link to={`update/${product.id}`}>
                                <Button type={'ghost'}>Update</Button>
                            </Link>
                            <Link to={`remove/${product.id}`}>
                                <Button type={'primary'}>Remove</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            {/*<ProductRemove visible={visibleRemove}*/}
            {/*               productId={productRemove?.id}*/}
            {/*               productName={productRemove?.name}*/}
            {/*               setVisible={setVisibleRemove}/>*/}
        </>
    );
};

