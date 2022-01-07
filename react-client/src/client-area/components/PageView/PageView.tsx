import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PAGE_QUERY, GetPageData, GetPageVars} from '../../../admin-area/gql/pages-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {message} from 'antd';
import {gqlLinks} from '../../../common-area/gql/client';
import parse from 'html-react-parser';
import {Error} from '../Error/Error';

export const PagesView = () => {
    const params = useParams();
    const pageSlug = params.slug || '';
    const getPageQuery = useQuery<GetPageData, GetPageVars>(
        GET_PAGE_QUERY,
        {
            variables: {slug: pageSlug},
            context: {gqlLink: gqlLinks.customer},
        },
    );

    if (!pageSlug || getPageQuery.error) {
        return <Error/>;
    }

    if (getPageQuery.loading) {
        return <Loading/>;
    }

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
