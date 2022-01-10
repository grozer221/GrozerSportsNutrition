import React from 'react';
import {Avatar, Carousel, Table} from 'antd';
import {ButtonsVUR} from '../../../admin-area/components/ButtonsVUD/ButtonsVUR';
import {Product, ProductInOrder} from '../../../types/types';
import s from './PinnedProductsInOrder.module.css';

type Props = {
    productsInOrder: ProductInOrder[],
    setProductsInOrder: (productsInOrder: ProductInOrder[]) => void,
    loading: boolean,
}

export const PinnedProductsInOrder: React.FC<Props> = ({loading, productsInOrder, setProductsInOrder}) => {

    const clickRemoveHandler = (productsInOrderRemove: ProductInOrder) => {
        const newProductsInOrder = productsInOrder.filter(productsInOrder => productsInOrder !== productsInOrderRemove);
        setProductsInOrder(newProductsInOrder);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, productInOrder: ProductInOrder) => <>#{productInOrder.id}</>,
        },
        {
            title: 'Image',
            dataIndex: 'fileImage',
            key: 'fileImage',
            render: (text: any, productInOrder: ProductInOrder) => (
                <Carousel className={s.carousel}>
                    {productInOrder.product.files.map(file => (
                        <Avatar key={file.id} className={s.image} shape={'square'} size={64} src={file.fileImage}
                                alt={file.fileName}/>
                    ))}
                </Carousel>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, productInOrder: ProductInOrder) => (
                <ButtonsVUR onRemove={() => clickRemoveHandler(productInOrder)}/>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={productsInOrder} pagination={false} loading={loading} rowKey={'id'}/>
    );
};
