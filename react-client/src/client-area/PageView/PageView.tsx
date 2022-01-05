import React from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PAGE_QUERY, GetPageData, GetPageVars} from '../../admin-area/GraphQL/pages-query';
import {Loading} from '../../components/Loading/Loading';
import {message} from 'antd';
import parse from 'html-react-parser';

export const PagesView = () => {
    const params = useParams();
    const pageSlug = params.slug || '';
    const getPageQuery = useQuery<GetPageData, GetPageVars>(
        GET_PAGE_QUERY,
        {variables: {slug: pageSlug}},
    );

    if (!pageSlug)
        return <Navigate to={'../../error'}/>;

    if (getPageQuery.loading)
        return <Loading/>;

    if (getPageQuery.error) {
        message.error(getPageQuery.error);
    }

    const page = getPageQuery.data?.getPage;

    return (
        <div>
            {page && parse(page?.text)}
        </div>
    );
};
