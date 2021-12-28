import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Divider, Switch, Table} from 'antd';
import {useMutation, useQuery} from '@apollo/client';
import {
    GET_CATEGORIES_QUERY,
    GetCategoriesData,
    getCategoriesObject,
    GetCategoriesVars,
} from '../../GraphQL/categories-query';
import {Category} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {
    REMOVE_CATEGORIES_MUTATION,
    RemoveCategoriesData,
    RemoveCategoriesVars,
    UPDATE_CATEGORIES_MUTATION,
    UpdateCategoriesData,
    UpdateCategoriesVars,
} from '../../GraphQL/categories-mutation';
import s from './CategoriesIndex.module.css';

export const CategoriesIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const getCategoriesQuery = useQuery<GetCategoriesData, GetCategoriesVars>(
        GET_CATEGORIES_QUERY,
        {variables: {getCategoriesInput: {skip: pageSkip, take: pageTake}}},
    );
    const [categoriesObj, setCategoriesObj] = useState<getCategoriesObject>({categories: [], total: 0});
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [removeCategory, removeCategoryOptions] = useMutation<RemoveCategoriesData, RemoveCategoriesVars>(REMOVE_CATEGORIES_MUTATION);
    const [updateCategory, updateCategoryOptions] = useMutation<UpdateCategoriesData, UpdateCategoriesVars>(UPDATE_CATEGORIES_MUTATION);

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

    const onRemove = async (id: number) => {
        const response = await removeCategory({variables: {id: id}});
        if (!response.errors)
            await getCategoriesQuery.refetch({getCategoriesInput: {skip: pageSkip, take: pageTake}});
        else
            console.log(response.errors);
    };

    const toggleIsShownHandler = async (category: Category, flag: boolean) => {
        category.isShown = flag;
        // @ts-ignore
        const {key, slug, ...rest} = category;
        const response = await updateCategory({
            variables: {
                updateCategoryInput: {
                    ...rest
                },
            },
        });
        if (!response.errors) {
            const newCategories = categoriesObj.categories.map(category => (category.id == response.data?.updateCategory.id ? response.data.updateCategory : category));
            setCategoriesObj({categories: newCategories, total: categoriesObj.total});
        } else {
            console.log(response.errors);
        }

    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text: any, category: Category) => <>#{category.id}</>,
        },
        {
            title: 'Is shown',
            dataIndex: 'isShown',
            render: (text: any, category: Category) => (
                <Switch size={'small'} checked={category.isShown}
                        onChange={(flag) => toggleIsShownHandler(category, flag)}/>
            ),
        },
        // {
        //     title: 'Image',
        //     dataIndex: 'fileImage',
        //     render: (text: any, category: Category) => (
        //         <Carousel className={s.carousel}>
        //             {product.files.map(file => (
        //                 <div>
        //                     <Avatar className={s.image} shape={'square'} size={64} src={file.fileImage}
        //                             alt={file.fileName}/>
        //                 </div>
        //             ))}
        //         </Carousel>
        //     ),
        // },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            render: (text: any, category: Category) => (
                <ButtonsVUR viewUrl={`${category.id}`} updateUrl={`update/${category.id}`}
                            onRemove={() => onRemove(category.id)}/>
            ),
        },
    ];

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
                    dataSource={categoriesObj.categories.map(category => ({key: category.id, ...category}))}

                    pagination={{
                        total: categoriesObj.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await getCategoriesQuery.refetch({getCategoriesInput: {skip: pageSkip, take: pageTake}});
                        },
                        // onShowSizeChange: async (pageNumber, pageSize) => {
                        //     setPageTake(pageSize);
                        //     await refetch({getProductsInput: {skip: (pageNumber - 1) * pageTake, take: pageTake}});
                        // },
                    }}
                />
            </div>
        </>
    );
};
