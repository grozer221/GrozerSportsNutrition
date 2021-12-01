import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {s_getIsAuth} from '../../../redux/auth-selectors';
import {Layout} from 'antd';
import {AppMenu} from '../Menu/AppMenu';
import {AppHeader} from '../Header/AppHeader';
import {AppBreadcrumb} from '../Breadcrumb/AppBreadcrumb';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Home} from '../Home/Home';
import {UsersController} from '../Users/UsersController';
import s from './AdminLayout.module.css';
import {Error} from '../Error/Error';
import {ProductsController} from '../Products/ProductsController';
import {CategoriesController} from '../Categories/CategoriesController';
import {FilesController} from '../Files/FilesController';

const {Content} = Layout;

export const AdminLayout: FC = () => {
    console.log('AppLayout');
    const isAuth = useSelector(s_getIsAuth);

    if (!isAuth)
        return <Navigate to={'/admin/login'}/>;

    return (
        <Layout className={s.layout}>
            <AppMenu/>
            <Layout className="site-layout">
                <AppHeader/>
                <Content className={s.content}>
                    <AppBreadcrumb/>
                    <div className={s.siteLayoutBackground}>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'products/*'} element={<ProductsController/>}/>
                            <Route path={'categories/*'} element={<CategoriesController/>}/>
                            <Route path={'files/*'} element={<FilesController/>}/>
                            <Route path={'users/*'} element={<UsersController/>}/>
                            <Route path={'*'} element={<Error/>}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
