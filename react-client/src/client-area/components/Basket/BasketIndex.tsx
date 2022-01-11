import * as React from 'react';
import {s_getProductsInBasket} from '../../../redux/basket.selectors';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {PinnedProductsInOrder} from '../../../common-area/components/PinnedProductsInOrder/PinnedProductsInOrder';

export const BasketIndex = () => {
    const productsInBasket = useSelector(s_getProductsInBasket);
    const dispatch = useDispatch();


    if (!productsInBasket.length)
        return (
            <div>Basket is empty</div>
        );

    return (
        <div>
            <PinnedProductsInOrder loading={false}/>
            <Link to={'./place-an-order'}>
                <button className="buttonSubmit">Place an order</button>
            </Link>
        </div>
    );
};
