import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {UsersIndex} from './UsersIndex';
import {Error} from '../Error/Error';
import {UsersView} from './UsersView';
import {UsersUpdate} from './UsersUpdate';

export const UsersController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<UsersIndex/>}/>
            <Route path={':email'} element={<UsersView/>}/>
            <Route path={'update/:email'} element={<UsersUpdate/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
