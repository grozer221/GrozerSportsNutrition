import React from 'react';
import {Avatar, Carousel, Table} from 'antd';
import {ButtonsVUR} from '../../../admin-area/components/ButtonsVUD/ButtonsVUR';
import {ProductInBasket} from '../../../types/types';
import s from './PinnedProductsInOrder.module.css';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {actions} from '../../../redux/basket-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {s_getProductsInBasket, s_getTotalPrice} from '../../../redux/basket.selectors';

type Props = {
    loading: boolean,
}

export const PinnedProductsInOrder: React.FC<Props> = ({loading}) => {
    const productsInBasket = useSelector(s_getProductsInBasket);
    const totalPrice = useSelector(s_getTotalPrice);
    const dispatch = useDispatch();

    const decrementProductInBasketHandler = (productInBasket: ProductInBasket) => {
        dispatch(actions.decrementProductInBasket(productInBasket));
    };

    const incrementProductInBasketHandler = (productInBasket: ProductInBasket) => {
        dispatch(actions.incrementProductInBasket(productInBasket));
    };

    const removeProductsFromBasketHandler = (productInBasket: ProductInBasket) => {
        dispatch(actions.removeProductFromBasket(productInBasket));
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text: any, productInBasket: ProductInBasket) => <>#{productInBasket.product.id}</>,
        },
        {
            title: 'Image',
            dataIndex: 'fileImage',
            render: (text: any, productInBasket: ProductInBasket) => (
                <Carousel className={s.carousel}>
                    {productInBasket?.product?.files?.map(file => (
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
            render: (text: any, productInBasket: ProductInBasket) => <span>{productInBasket.product.name}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'priceUAH',
            key: 'priceUAH',
            render: (text: any, productInBasket: ProductInBasket) => <span>{productInBasket.product.priceUAH}</span>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: any, productInBasket: ProductInBasket) => (
                <div className={s.quantity}>
                    <button type={'button'}
                            className={s.buttonPlusMinus}
                            onClick={() => decrementProductInBasketHandler(productInBasket)}>
                        <MinusOutlined/>
                    </button>
                    <div className={s.quantityNumber}>{productInBasket.productQuantity}</div>
                    <button type={'button'}
                            className={s.buttonPlusMinus}
                            onClick={() => incrementProductInBasketHandler(productInBasket)}>
                        <PlusOutlined/>
                    </button>
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, productInBasket: ProductInBasket) => (
                <ButtonsVUR onRemove={() => removeProductsFromBasketHandler(productInBasket)}/>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={productsInBasket} pagination={false} loading={loading} rowKey={'id'}/>
            <h2 className={s.totalPrice}>Total price: {totalPrice} UAH</h2>
        </>
    );
};
