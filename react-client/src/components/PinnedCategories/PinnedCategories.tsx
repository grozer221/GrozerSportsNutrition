import React from 'react';
import {Table} from 'antd';
import {ButtonsVUR} from '../../admin-area/components/ButtonsVUD/ButtonsVUR';
import {Category, Product} from '../../types/types';
import s from './PinnedCategories.module.css';

type Props = {
    categories: Category[],
    setCategories: (categories: Category[]) => void,
    loading: boolean,
}

export const PinnedCategories: React.FC<Props> = ({loading, categories, setCategories}) => {

    const clickRemoveHandler = (categoryRemove: Category) => {
        const newCategories = categories.filter(category => category !== categoryRemove);
        setCategories(newCategories);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text: any, category: Category) => <>#{category.id}</>,
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
                <ButtonsVUR onRemove={() => clickRemoveHandler(category)}/>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={categories} pagination={false} loading={loading}/>
    );
};
