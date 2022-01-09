import React, {FC} from 'react';
import {Product} from '../../../types/types';
import s from './ProductCard.module.css';
import {Avatar, Carousel, message} from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {actions} from '../../../redux/basket-reducer';
import {ShoppingCartOutlined} from '@ant-design/icons';

type Props = {
    product: Product
};

export const ProductCard: FC<Props> = ({product}) => {
    const dispatch = useDispatch();
    const addToBasketHandler = () => {
        dispatch(actions.addProductToBasket(product));
    };

    return (
        <div className={s.productCard}>
            <div className={s.nameAndPhotos}>
                <Link to={`/products/${product.slug}`} className={s.name}>{product.name}</Link>
                <Carousel className={s.carousel}>
                    {product.files?.map(file => (
                        <Avatar key={file.id} shape={'square'} size={128} src={file.fileImage} alt={file.fileName}/>
                    ))}
                </Carousel>
            </div>
            <div className={s.priceAndAddToBasket}>
                <div className={s.price}>{product.priceUAH} UAH</div>
                <button onClick={addToBasketHandler} className="buttonSubmit">
                    <ShoppingCartOutlined/>
                </button>
            </div>
        </div>
    );
};
