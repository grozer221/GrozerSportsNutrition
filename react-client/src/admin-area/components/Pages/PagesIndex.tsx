import {useMutation, useQuery} from '@apollo/client';
import {Button, Divider, Switch, Table} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../../../components/Loading/Loading';
import {Page} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {GET_PAGES_QUERY, GetPagesData, GetPagesVars} from '../../GraphQL/pages-query';
import {
    REMOVE_PAGE_MUTATION,
    RemovePageData,
    RemovePageVars,
    UPDATE_PAGE_MUTATION,
    UpdatePageData,
    UpdatePageVars,
} from '../../GraphQL/pages-mutation';
// @ts-ignore
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';

export const PagesIndex: FC = () => {
    const getPagesQuery = useQuery<GetPagesData, GetPagesVars>(GET_PAGES_QUERY);
    const [pages, setPages] = useState<Page[]>([]);
    const [removePage, removePageOptions] = useMutation<RemovePageData, RemovePageVars>(REMOVE_PAGE_MUTATION);
    const [updatePage, updatePageOptions] = useMutation<UpdatePageData, UpdatePageVars>(UPDATE_PAGE_MUTATION);
    const [selectedPages, setSelectedPages] = useState<Page[]>([]);

    useEffect(() => {
        if (getPagesQuery.data?.getPages)
            setPages(getPagesQuery.data.getPages);
    }, [getPagesQuery.data?.getPages]);

    const onRemove = async (id: number) => {
        const response = await removePage({variables: {id: id}});
        if (response.data)
            await getPagesQuery.refetch();
        else
            console.log(response.errors);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Page[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedPages(selectedRows);
        },
    };

    const toggleIsShownHandler = async (page: Page, flag: boolean) => {
        page.isShown = flag;
        // @ts-ignore
        const {key, slug, ...rest} = page;
        const response = await updatePage({
            variables: {
                updatePageInput: {
                    ...rest,
                },
            },
        });
        if (!response.errors) {
            const newPages = pages.map(page => (page.id == response.data?.updatePage.id ? response.data.updatePage : page));
            setPages(newPages);
        } else {
            console.log(response.errors);
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text: any, page: Page) => <>#{page.id}</>,
        },
        {
            title: 'Is shown',
            dataIndex: 'isShown',
            render: (text: any, page: Page) => (
                <Switch size={'small'} checked={page.isShown}
                        onChange={(flag) => toggleIsShownHandler(page, flag)}/>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            render: (text: any, page: Page) => (
                <ButtonsVUR viewUrl={`${page.id}`} updateUrl={`update/${page.id}`}
                            onRemove={() => onRemove(page.id)}/>
            ),
        },
    ];

    if (getPagesQuery.loading)
        return <Loading/>;

    if (getPagesQuery.error)
        console.log(getPagesQuery.error);

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Pages</header>
                    <Link to={'create'}>
                        <Button>Create</Button>
                    </Link>
                </div>
            </div>
            <Divider/>
            <div>
                <Table
                    loading={getPagesQuery.loading || removePageOptions.loading || updatePageOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={pages.map(page => ({key: page.id, ...page}))}
                    pagination={false}
                />
            </div>
        </>
    );
};

