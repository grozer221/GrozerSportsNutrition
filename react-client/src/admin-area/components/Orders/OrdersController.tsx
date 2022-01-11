import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {OrdersIndex} from './OrdersIndex';
import {OrdersView} from './OrdersView';
import {OrdersCreate} from './OrdersCreate';

export const OrdersController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<OrdersIndex/>}/>
            <Route path={':id'} element={<OrdersView/>}/>
            <Route path={'create'} element={<OrdersCreate/>}/>
            {/*<Route path={'update/:slug'} element={<PagesUpdate/>}/>*/}
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};