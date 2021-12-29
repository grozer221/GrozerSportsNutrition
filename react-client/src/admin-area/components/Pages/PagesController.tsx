import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {PagesIndex} from './PagesIndex';
import {PagesCreate} from './PagesCreate';
import {PagesUpdate} from './PagesUpdate';
import {PagesView} from './PagesView';

export const PagesController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<PagesIndex/>}/>
            <Route path={':id'} element={<PagesView/>}/>
            <Route path={'create'} element={<PagesCreate/>}/>
            <Route path={'update/:id'} element={<PagesUpdate/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
