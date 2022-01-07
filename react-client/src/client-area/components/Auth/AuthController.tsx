import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Error} from '../Error/Error';
import {AuthLogin} from './AuthLogin';
import {AuthRegister} from './AuthRegister';

export const AuthController: FC = () => {
    return (
        <Routes>
            <Route path={'login'} element={<AuthLogin/>}/>
            <Route path={'register'} element={<AuthRegister/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
};
