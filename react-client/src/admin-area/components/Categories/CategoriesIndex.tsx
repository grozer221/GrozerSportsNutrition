import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Divider, message, Switch, Table} from 'antd';
import {useMutation, useQuery} from '@apollo/client';
import {
    GET_CATEGORIES_QUERY,
    GetCategoriesData,
    getCategoriesObject,
    GetCategoriesVars,
} from '../../gql/categories-query';
import {Category} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {
    REMOVE_CATEGORY_MUTATION,
    RemoveCategoryData,
    RemoveCategoryVars,
    UPDATE_CATEGORY_MUTATION,
    UpdateCategoryData,
    UpdateCategoryVars,
} from '../../gql/categories-mutation';
import {gqlLinks} from '../../../common-area/gql/client';
import {Loading} from '../../../common-area/components/Loading/Loading';

export const CategoriesIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const [categoriesObj, setCategoriesObj] = useState<getCategoriesObject>({categories: [], total: 0});
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const getCategoriesQuery = useQuery<GetCategoriesData, GetCategoriesVars>(
        GET_CATEGORIES_QUERY,
        {
            variables: {getCategoriesInput: {skip: pageSkip, take: pageTake, likeName: ''}},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeCategory, removeCategoryOptions] = useMutation<RemoveCategoryData, RemoveCategoryVars>(REMOVE_CATEGORY_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const [updateCategory, updateCategoryOptions] = useMutation<UpdateCategoryData, UpdateCategoryVars>(UPDATE_CATEGORY_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );

    useEffect(() => {
        if (getCategoriesQuery.data?.getCategories)
            setCategoriesObj(getCategoriesQuery.data.getCategories);
    }, [getCategoriesQuery.data?.getCategories]);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Category[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedCategories(selectedRows);
        },
    };

    const onRemove = async (slug: string) => {
        const response = await removeCategory({variables: {slug: slug}});
        if (!response.errors)
            await getCategoriesQuery.refetch({getCategoriesInput: {skip: pageSkip, take: pageTake, likeName: ''}});
        else
            response.errors.forEach(error => message.error(error.message));
    };

    const toggleIsShownHandler = async (category: Category, flag: boolean) => {
        const {slug, products, ...rest} = category;
        rest.isShown = flag;
        const response = await updateCategory({
            variables: {
                updateCategoryInput: {
                    ...rest,
                },
            },
        });
        if (!response.errors) {
            const newCategories = categoriesObj.categories.map(category => (category.id == response.data?.updateCategory.id ? response.data.updateCategory : category));
            setCategoriesObj({categories: newCategories, total: categoriesObj.total});
        } else {
            response.errors.forEach(error => message.error(error.message));
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, category: Category) => <>#{category.id}</>,
        },
        {
            title: 'Is shown',
            dataIndex: 'isShown',
            key: 'isShown',
            render: (text: any, category: Category) => (
                <Switch size={'small'} checked={category.isShown}
                        onChange={(flag) => toggleIsShownHandler(category, flag)}/>
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
            render: (text: any, category: Category) => (
                <ButtonsVUR viewUrl={`${category.slug}`} updateUrl={`update/${category.slug}`}
                            onRemove={() => onRemove(category.slug)}/>
            ),
        },
    ];

    if (getCategoriesQuery.error)
        message.error(getCategoriesQuery.error.message);

    if (getCategoriesQuery.loading)
        return <Loading/>;

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Categories</header>
                    <Link to={'create'}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <strong>search</strong>
            </div>
            <Divider/>
            <div>
                <Table
                    loading={getCategoriesQuery.loading || removeCategoryOptions.loading || updateCategoryOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={categoriesObj.categories}
                    pagination={{
                        total: categoriesObj.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await getCategoriesQuery.refetch({getCategoriesInput: {skip: pageSkip, take: pageTake, likeName: ''}});
                        },
                    }}
                    rowKey={'id'}
                />
            </div>
        </>
    );
};
