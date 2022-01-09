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
import {Header} from '../Header/Header';
import {MyMenu} from '../MyMenu/MyMenu';
import {ProductsController} from '../Products/ProductsController';
import {BasketController} from '../Basket/BasketController';

export const ClientLayout: FC = () => {
    return (
        <>
            <div className={s.wrapperPages}>
                <div className={s.container}>
                    <Pages/>
                </div>
            </div>
            <div className={s.container}>
                <Header/>
            </div>
            <div className={s.wrapperMenu}>
                <div className={s.container}>
                    <MyMenu/>
                </div>
            </div>
            <div className={s.container}>
                <div className={s.breadcrumb}>
                    <MyBreadcrumb/>
                </div>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/products/*'} element={<ProductsController/>}/>
                    <Route path={'/basket/*'} element={<BasketController/>}/>
                    <Route path={'/confirmation-email/:token'} element={<ConfirmationEmail/>}/>
                    <Route path={'/pages/:slug'} element={<PagesView/>}/>
                    <Route path={'/auth/*'} element={<AuthController/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
            </div>
        </>
    );
};
