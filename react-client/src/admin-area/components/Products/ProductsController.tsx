import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {ProductsCreate} from './ProductsCreate';
import {ProductsIndex} from './ProductsIndex';
import {ProductUpdate} from './ProductUpdate';
import {ProductView} from './ProductView';
import {ProductsRemove} from './ProductsRemove';

export const ProductsController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProductsIndex/>}/>
            <Route path={':id'} element={<ProductView/>}/>
            <Route path={'create'} element={<ProductsCreate/>}/>
            <Route path={'update/:id'} element={<ProductUpdate/>}/>
            <Route path={'remove/:id'} element={<ProductsRemove/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
