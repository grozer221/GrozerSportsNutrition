import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../../../admin-area/components/Error/Error';
import {ProductsIndex} from './ProductsIndex';
import {ProductsView} from './ProductsView';

export const ProductsController = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProductsIndex/>}/>
            <Route path={'/:slug'} element={<ProductsView/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
