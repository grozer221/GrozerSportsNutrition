import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './ClientLayout.module.css';
import {Home} from '../Home/Home';
import {Error} from '../Error/Error';
import {Pages} from '../Pages/Pages';
import {MyBreadcrumb} from '../../../common-area/components/MyBreadcrumb/MyBreadcrumb';
import {PagesView} from '../PageView/PageView';
import {ConfirmationEmail} from '../ConfirmationEmail/ConfirmationEmail';
import {AuthController} from '../Auth/AuthController';

export const ClientLayout: FC = () => {
    return (
        <>
            <div className={s.wrapperPages}>
                <div className={s.container}>
                    <Pages/>
                </div>
            </div>
            <div className={s.container}>
                <MyBreadcrumb/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/confirmation-email/:token'} element={<ConfirmationEmail/>}/>
                    <Route path={'/pages/:slug'} element={<PagesView/>}/>
                    <Route path={'/auth/*'} element={<AuthController/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
            </div>
        </>
    );
};
