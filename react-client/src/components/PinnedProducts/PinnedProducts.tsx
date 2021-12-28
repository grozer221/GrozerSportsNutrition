import React from 'react';
import {Avatar, Carousel, Switch, Table} from 'antd';
import {ButtonsVUR} from '../../admin-area/components/ButtonsVUD/ButtonsVUR';
import {FileType, Product} from '../../types/types';
import s from './PinnedProducts.module.css';

type Props = {
    products: Product[],
    setProducts: (products: Product[]) => void,
    loading: boolean,
}

export const PinnedProducts: React.FC<Props> = ({loading, products, setProducts}) => {

    const clickRemoveHandler = (productRemove: Product) => {
        const newFiles = products.filter(product => product !== productRemove);
        setProducts(newFiles);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text: any, product: Product) => <>#{product.id}</>,
        },
        // {
        //     title: 'Is shown',
        //     dataIndex: 'isShown',
        //     render: (text: any, product: Product) => (
        //         <Switch size={'small'} checked={product.isShown}
        //                 onChange={(flag) => toggleIsShownHandler(product, flag)}/>
        //     ),
        // },
        {
            title: 'Image',
            dataIndex: 'fileImage',
            render: (text: any, product: Product) => (
                <Carousel className={s.carousel}>
                    {product.files.map(file => (
                        <div>
                            <Avatar className={s.image} shape={'square'} size={64} src={file.fileImage}
                                    alt={file.fileName}/>
                        </div>
                    ))}
                </Carousel>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'priceUAH',
        },
        {
            title: 'Actions',
            render: (text: any, product: Product) => (
                <ButtonsVUR onRemove={() => clickRemoveHandler(product)}/>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={products} pagination={false} loading={loading}/>
    );
};
