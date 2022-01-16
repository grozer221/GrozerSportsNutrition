import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {s_getAuthData, s_getIsAuth} from '../../../redux/auth-selectors';
import {Layout, message} from 'antd';
import {MyMenu} from '../MyMenu/MyMenu';
import {MyBreadcrumb} from '../../../common-area/components/MyBreadcrumb/MyBreadcrumb';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Home} from '../Home/Home';
import {UsersController} from '../Users/UsersController';
import s from './AdminLayout.module.css';
import {Error} from '../Error/Error';
import {ProductsController} from '../Products/ProductsController';
import {CategoriesController} from '../Categories/CategoriesController';
import {FilesController} from '../Files/FilesController';
import {Settings} from '../Settings/Settings';
import {PagesController} from '../Pages/PagesController';
import {OrdersController} from '../Orders/OrdersController';
import {isModeratorOrAdmin} from '../../../utils/authorization';

const {Content} = Layout;

export const AdminLayout: FC = () => {
    const isAuth = useSelector(s_getIsAuth);
    const authDate = useSelector(s_getAuthData);

    if (!isAuth)
        return <Navigate to={'/admin/auth/login'}/>;

    if (authDate?.user && !isModeratorOrAdmin(authDate?.user)){
        message.warning('Access forbidden')
        return <Navigate to={'/'}/>;
    }

    return (
        <Layout className={s.layout}>
            <MyMenu/>
            <Layout className="site-layout">
                <Content className={s.content}>
                    <MyBreadcrumb/>
                    <div className={s.siteLayoutBackground}>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'orders/*'} element={<OrdersController/>}/>
                            <Route path={'products/*'} element={<ProductsController/>}/>
                            <Route path={'categories/*'} element={<CategoriesController/>}/>
                            <Route path={'files/*'} element={<FilesController/>}/>
                            <Route path={'users/*'} element={<UsersController/>}/>
                            <Route path={'pages/*'} element={<PagesController/>}/>
                            <Route path={'settings/*'} element={<Settings/>}/>
                            <Route path={'*'} element={<Error/>}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
