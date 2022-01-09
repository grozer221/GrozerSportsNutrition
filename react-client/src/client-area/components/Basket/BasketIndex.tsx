import * as React from 'react';
import {s_getProductsInBasket} from '../../../redux/basket.selectors';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Carousel} from 'antd';
import s from './BasketIndex.module.css';
import {ProductInBasket} from '../../../types/types';
import {actions} from '../../../redux/basket-reducer';
import {CloseOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

export const BasketIndex = () => {
    const productsInBasket = useSelector(s_getProductsInBasket);
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

    if (!productsInBasket.length)
        return (
            <div>Basket is empty</div>
        );

    return (
        <div>
            <div className={s.productsInBasket}>
                {productsInBasket.map(productInBasket => (
                    <div className={s.productInBasket}>
                        <div className={s.productInBasketInner}>
                            <button className={s.buttonPlusMinus}
                                    onClick={() => removeProductsFromBasketHandler(productInBasket)}>
                                <CloseOutlined/>
                            </button>
                            <Carousel className={s.carousel}>
                                {productInBasket.product.files?.map(file => (
                                    <Avatar key={file.id} shape={'square'} size={64} src={file.fileImage}
                                            alt={file.fileName}/>
                                ))}
                            </Carousel>
                            <div>{productInBasket.product.name}</div>
                        </div>
                        <div className={s.productInBasketInner}>
                            <div className={s.quantity}>
                                <button className={s.buttonPlusMinus}
                                        onClick={() => decrementProductInBasketHandler(productInBasket)}>
                                    <MinusOutlined/>
                                </button>
                                <div className={s.quantityNumber}>{productInBasket.quantity}</div>
                                <button className={s.buttonPlusMinus}
                                        onClick={() => incrementProductInBasketHandler(productInBasket)}>
                                    <PlusOutlined/>
                                </button>
                            </div>
                            <div>{productInBasket.product.priceUAH * productInBasket.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to={'./place-an-order'}>
                <button className="buttonSubmit">Place an order</button>
            </Link>
        </div>
    );
};
