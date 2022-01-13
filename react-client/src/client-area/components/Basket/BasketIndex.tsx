import * as React from 'react';
import {s_getProductsInBasket} from '../../../redux/basket.selectors';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {PinnedProductsInOrder} from '../../../common-area/components/PinnedProductsInOrder/PinnedProductsInOrder';

export const BasketIndex = () => {
    const productsInBasket = useSelector(s_getProductsInBasket);

    return (
        <div>
            <PinnedProductsInOrder loading={false}/>
            {productsInBasket.length > 0 && <Link to={'./place-an-order'}>
                <button className="buttonSubmit">Place an order</button>
            </Link>
            }
        </div>
    );
};
