import React, {FC} from "react";
import {useSelector} from "react-redux";
import {s_getIsAuth} from "../../../redux/auth-selectors";
import {Login} from "../Login/Login";
import {Layout} from "antd";
import {AppMenu} from "../Menu/AppMenu";
import {AppHeader} from "../Header/AppHeader";
import {AppBreadcrumb} from "../Breadcrumb/AppBreadcrumb";
import {Navigate, Route, Routes,} from "react-router-dom";
import {Home} from "../Home/Home";
import {UsersController} from "../Users/UsersController";
import s from './AppLayout.module.css';
import {UsersIndex} from "../Users/UsersIndex/UsersIndex";
import {Error} from "../Error/Error";
import { ProductsController } from "../Products/ProductsController";
import { CategoriesController } from "../Categories/CategoriesController";

const {Content} = Layout;

export const AdminLayout: FC = () => {
    console.log('AppLayout')
    const isAuth = useSelector(s_getIsAuth);

    if (!isAuth)
        return <Navigate to={'/admin/login'}/>

    return (
        <Layout style={{minHeight: '100vh'}}>
            <AppMenu/>
            <Layout className="site-layout">
                <AppHeader/>
                <Content style={{margin: '0 16px'}}>
                    <AppBreadcrumb/>
                    <div className={s.siteLayoutBackground}>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'products/*'} element={ <ProductsController/>}/>
                            <Route path={'categories/*'} element={ <CategoriesController/>}/>
                            <Route path={'users/*'} element={ <UsersController/>}/>
                            <Route path={'*'} element={<Error/>}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
