import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {FilesCreate} from './FilesCreate';
import {FilesIndex} from './FilesIndex';
import {FilesUpdate} from './FilesUpdate';
import {FilesView} from './FilesView';
import {FilesRemove} from './FilesRemove';

export const FilesController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<FilesIndex/>}/>
            <Route path={':id'} element={<FilesView/>}/>
            <Route path={'create'} element={<FilesCreate/>}/>
            <Route path={'update/:id'} element={<FilesUpdate/>}/>
            <Route path={'remove/:id'} element={<FilesRemove/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
