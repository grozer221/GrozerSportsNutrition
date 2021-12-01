import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {FilesCreate} from './FilesCreate/FilesCreate';
import {FilesIndex} from './FilesIndex/FilesIndex';
import {FilesUpdate} from './FilesUpdate/FilesUpdate';
import {FilesView} from './FilesView/FilesView';
import {FilesRemove} from './FilesRemove/FilesRemove';

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
