import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {ProductCreate} from './ProductCreate/ProductCreate';
import {ProductsIndex} from './ProductsIndex/ProductsIndex';
import {ProductUpdate} from './ProductUpdate/ProductUpdate';
import {ProductView} from './ProductView/ProductView';
import {ProductRemove} from './ProductRemove/ProductRemove';

export const ProductsController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProductsIndex/>}/>
            <Route path={':id'} element={<ProductView/>}/>
            <Route path={'create'} element={<ProductCreate/>}/>
            <Route path={'update/:id'} element={<ProductUpdate/>}/>
            <Route path={'remove/:id'} element={<ProductRemove/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
