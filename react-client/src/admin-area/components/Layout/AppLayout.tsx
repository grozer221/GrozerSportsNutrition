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
import {Users} from "../Users/Users";
import {Error} from "../Error/Error";

const {Content} = Layout;

export const AppLayout: FC = () => {
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
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Routes>
                            <Route path={'/admin'} element={<Home/>}/>
                            <Route path={'/admin/users'} element={<Users/>}/>
                            <Route path={'/admin*'} element={<Error/>}/>
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
