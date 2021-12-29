import React, {FC} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import {Loading} from '../../../components/Loading/Loading';
import {Card, Tag} from 'antd';
import s from './PagesView.module.css';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {GET_PAGE_QUERY, GetPageData, GetPageVars} from '../../GraphQL/pages-query';
import {REMOVE_PAGE_MUTATION, RemovePageData, RemovePageVars} from '../../GraphQL/pages-mutation';

export const PagesView: FC = () => {
    const params = useParams();
    const pageId = params.id ? parseInt(params.id) : 0;
    const getPageQuery = useQuery<GetPageData, GetPageVars>(
        GET_PAGE_QUERY,
        {variables: {id: pageId}},
    );
    const [removePage, removePageOptions] = useMutation<RemovePageData, RemovePageVars>(REMOVE_PAGE_MUTATION);
    const navigate = useNavigate();

    const onRemove = async (id: number) => {
        const response = await removePage({variables: {id: id}});
        if (response.data)
            navigate(`../`);
        else
            console.log(response.errors);
    };

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (getPageQuery.loading)
        return <Loading/>;

    if (getPageQuery.error)
        console.log(getPageQuery.error);

    const page = getPageQuery.data?.getPage;
    return (
        <>
            <div className={s.photosAndMainInfo}>

                <div>
                    <ButtonsVUR updateUrl={`../update/${pageId}`} onRemove={() => onRemove(pageId)}/>
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
            <Card title="Text" className={s.card}>{page?.text}</Card>
        </>
    );
};
