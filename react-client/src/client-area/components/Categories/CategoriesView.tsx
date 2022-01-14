import React, {FC} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Card} from 'antd';
import parse from 'html-react-parser';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';
import {GET_CATEGORY_QUERY, GetCategoryData, GetCategoryVars} from '../../gql/categories-query';
import s from './CategoriesView.module.css';
import {ProductCard} from '../Products/ProductCard';

export const CategoriesView: FC = () => {
    const params = useParams();
    const categorySlug = params.slug || '';
    const getCategoryQuery = useQuery<GetCategoryData, GetCategoryVars>(
        GET_CATEGORY_QUERY,
        {
            variables: {slug: categorySlug},
            context: {gqlLink: gqlLinks.customer},
        },
    );

    if (!categorySlug || getCategoryQuery.error)
        return <Error/>;

    if (getCategoryQuery.loading)
        return <Loading/>;

    const category = getCategoryQuery.data?.getCategory;
    return (
        <>
            <header>{category?.name}</header>
            <div className={s.products}>
                {category?.products.map(product => (
                    <ProductCard product={product}/>
                ))}
            </div>
            <div className={s.cards}>
                <Card title="Description" className={s.card}>{category && parse(category?.description)}</Card>
            </div>
        </>
    );
};
