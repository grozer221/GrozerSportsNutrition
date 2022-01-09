import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {BasketIndex} from './BasketIndex';
import {BasketCheckout} from './BasketCheckout';
import {BasketPlaceAnOrder} from './BasketPlaceAnOrder';

export const BasketController = () => {
    return (
        <Routes>
            <Route path={'/'} element={<BasketIndex/>}/>
            <Route path={'/checkout'} element={<BasketCheckout/>}/>
            <Route path={'/place-an-order'} element={<BasketPlaceAnOrder/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
