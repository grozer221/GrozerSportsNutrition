import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../../../admin-area/components/Error/Error';
import {CategoriesView} from './CategoriesView';

export const CategoriesController = () => {
    return (
        <Routes>
            <Route path={'/:slug'} element={<CategoriesView/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
