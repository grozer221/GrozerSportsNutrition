import React, {FC} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../../GraphQL/products-query';
import {Loading} from '../../../../components/Loading/Loading';

export const ProductView: FC = () => {
    const params = useParams();

    const {loading, error, data} = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {variables: {id: params.id ? parseInt(params.id) : 0}},
    );

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    return (
        <>
            <div>id: {data?.getProduct.id}</div>
            <div>name: {data?.getProduct.name}</div>
        </>
    );
};
