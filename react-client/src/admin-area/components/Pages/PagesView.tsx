import React, {FC} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Card, message, Tag} from 'antd';
import s from './PagesView.module.css';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {GET_PAGE_QUERY, GetPageData, GetPageVars} from '../../gql/pages-query';
import {REMOVE_PAGE_MUTATION, RemovePageData, RemovePageVars} from '../../gql/pages-mutation';
import parse from 'html-react-parser';
import {gqlLinks} from '../../../common-area/gql/client';

export const PagesView: FC = () => {
    const params = useParams();
    const pageSlug = params.slug || '';
    const getPageQuery = useQuery<GetPageData, GetPageVars>(
        GET_PAGE_QUERY,
        {
            variables: {slug: pageSlug},
            context: {gqlLink: gqlLinks.admin}
        },
    );
    const [removePage, removePageOptions] = useMutation<RemovePageData, RemovePageVars>(REMOVE_PAGE_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const navigate = useNavigate();

    const onRemove = async (slug: string) => {
        const response = await removePage({variables: {slug: slug}});
        if (response.data)
            navigate(`../`);
        else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    if (!pageSlug || getPageQuery.error)
        return <Navigate to={'../../error'}/>;

    if (getPageQuery.loading)
        return <Loading/>;

    const page = getPageQuery.data?.getPage;
    return (
        <>
            <div className={s.photosAndMainInfo}>

                <div>
                    <ButtonsVUR updateUrl={`../update/${pageSlug}`} onRemove={() => onRemove(pageSlug)}/>
                    <header>{page?.name}</header>
                    <table className={s.info}>
                        <tbody>
                        <tr>
                            <td>Id:</td>
                            <td>
                                <span># {page?.id}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Is shown:</td>
                            <td>
                                {page?.isShown
                                    ? <Tag color="green">Yes</Tag>
                                    : <Tag color="red">No</Tag>
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Card title="Text" className={s.card}>{page && parse(page?.text)}</Card>
        </>
    );
};
