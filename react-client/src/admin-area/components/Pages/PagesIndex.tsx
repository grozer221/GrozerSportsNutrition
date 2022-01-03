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
    UPDATE_PAGES_MUTATION,
    UpdatePageData,
    UpdatePagesData,
    UpdatePagesVars,
    UpdatePageVars,
} from '../../GraphQL/pages-mutation';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import {MenuOutlined} from '@ant-design/icons';

export const PagesIndex: FC = () => {
    const getPagesQuery = useQuery<GetPagesData, GetPagesVars>(GET_PAGES_QUERY, {
        variables: {
            getPagesInput: {
                orderBy: 'sorting',
                orderByType: 'ASC',
                isShown: true,
            },
        },
    });
    const [pages, setPages] = useState<Page[]>([]);
    const [removePage, removePageOptions] = useMutation<RemovePageData, RemovePageVars>(REMOVE_PAGE_MUTATION);
    const [updatePage, updatePageOptions] = useMutation<UpdatePageData, UpdatePageVars>(UPDATE_PAGE_MUTATION);
    const [updatePages, updatePagesOptions] = useMutation<UpdatePagesData, UpdatePagesVars>(UPDATE_PAGES_MUTATION);
    const [selectedPages, setSelectedPages] = useState<Page[]>([]);

    useEffect(() => {
        if (getPagesQuery.data?.getPages)
            setPages(getPagesQuery.data.getPages);
    }, [getPagesQuery.data?.getPages]);

    const onRemove = async (id: number) => {
        const response = await removePage({variables: {id: id}});
        if (response.data)
            await getPagesQuery.refetch({
                getPagesInput: {
                    orderBy: 'sorting',
                    orderByType: 'ASC',
                    isShown: true,
                },
            });
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

    const DragHandle = SortableHandle(() => <MenuOutlined style={{cursor: 'grab', color: '#999'}}/>);
    const columns = [
        {
            title: 'Sort',
            dataIndex: 'sort',
            width: 30,
            className: 'drag-visible',
            render: () => <DragHandle/>,
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, page: Page) => <>#{page.id}</>,
        },
        {
            title: 'Is shown',
            dataIndex: 'isShown',
            key: 'isShown',
            render: (text: any, page: Page) => (
                <Switch size={'small'} checked={page.isShown}
                        onChange={(flag) => toggleIsShownHandler(page, flag)}/>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, page: Page) => (
                <ButtonsVUR viewUrl={`${page.id}`} updateUrl={`update/${page.id}`}
                            onRemove={() => onRemove(page.id)}/>
            ),
        },
    ];

    const SortableItem = SortableElement((props: any) => <tr {...props} />);
    const SortableContainerWrapper = SortableContainer((props: any) => <tbody {...props} />);


    const onSortEnd = async (props: any) => {
        if (props.oldIndex !== props.newIndex) {
            const sortedPages = arrayMoveImmutable([].concat(pages as any), props.oldIndex, props.newIndex)
                .filter(el => !!el)
                .map((page: Page, i) => ({
                    ...page,
                    sorting: i + 1,
                })) as Page[];
            setPages(sortedPages);
            const sortedPagesWithoutSlug = sortedPages.map(page => {
                const {slug, ...rest} = page;
                return rest;
            });
            const response = await updatePages({
                variables: {
                    updatePagesInput: {
                        updatePagesInput: sortedPagesWithoutSlug,
                    },
                },
            });
            if (!response.errors) {
                console.log('Sorted pages: ', sortedPages);
                response.data && setPages(response.data.updatePages);
            } else {
                console.log(response.errors);

            }
        }
    };

    const DraggableContainer = (props: any) => (
        <SortableContainerWrapper
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    const DraggableBodyRow = (props: any) => {
        const {className, style, ...restProps} = props;
        const index = pages.findIndex(x => x.id === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

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
                    loading={getPagesQuery.loading || removePageOptions.loading || updatePageOptions.loading || updatePagesOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={pages.map(page => ({key: page.id, ...page}))}
                    pagination={false}
                    rowKey="id"
                    components={{
                        body: {
                            wrapper: DraggableContainer,
                            row: DraggableBodyRow,
                        },
                    }}
                />
            </div>
        </>
    );
};

