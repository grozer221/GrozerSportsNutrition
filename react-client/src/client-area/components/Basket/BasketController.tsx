import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {BasketIndex} from './BasketIndex';
import {BasketPlaceAnOrder} from './BasketPlaceAnOrder';

export const BasketController = () => {
    return (
        <Routes>
            <Route path={'/'} element={<BasketIndex/>}/>
            <Route path={'/place-an-order'} element={<BasketPlaceAnOrder/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
