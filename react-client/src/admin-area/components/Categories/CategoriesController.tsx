import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {CategoriesIndex} from './CategoriesIndex';
import {CategoriesCreate} from './CategoriesCreate';

export const CategoriesController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<CategoriesIndex/>}/>
            <Route path={'create'} element={<CategoriesCreate/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
