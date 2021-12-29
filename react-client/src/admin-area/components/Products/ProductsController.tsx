import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {ProductsCreate} from './ProductsCreate';
import {ProductsIndex} from './ProductsIndex';
import {ProductsUpdate} from './ProductsUpdate';
import {ProductsView} from './ProductsView';

export const ProductsController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProductsIndex/>}/>
            <Route path={':id'} element={<ProductsView/>}/>
            <Route path={'create'} element={<ProductsCreate/>}/>
            <Route path={'update/:id'} element={<ProductsUpdate/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
