import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {CategoriesIndex} from './CategoriesIndex';
import {CategoriesCreate} from './CategoriesCreate';
import {CategoriesView} from './CategoriesView';
import {CategoriesUpdate} from './CategoriesUpdate';

export const CategoriesController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<CategoriesIndex/>}/>
            <Route path={'/:id'} element={<CategoriesView/>}/>
            <Route path={'create'} element={<CategoriesCreate/>}/>
            <Route path={'update/:id'} element={<CategoriesUpdate/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
