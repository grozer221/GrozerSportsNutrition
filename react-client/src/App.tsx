import React, {FC, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Route, Routes} from "react-router-dom";
import {ClientLayout} from "./client-area/Layout/ClientLayout";
import {useQuery} from '@apollo/client';
import {ME_QUERY, MeData, MeVars} from './admin-area/GraphQL/auth-query';
import {useDispatch} from 'react-redux';
import {actions} from './redux/auth-reducer';
import {Loading} from './components/Loading/Loading';
import {AdminLayout} from './admin-area/components/Layout/AdminLayout';
import { Login } from './admin-area/components/Login/Login';

export const App: FC = () => {
    const dispatch = useDispatch();
    const {data, error, loading} = useQuery<MeData, MeVars>(ME_QUERY);

    useEffect(() => {
        if (data && !error) {
            dispatch(actions.setAuthData(data.me, true))
        }
    }, [data, error]);

    if (loading)
        return <Loading/>

    return (
        <Routes>
            {/*<Route path={'/'}>*/}
            {/*    <AppLayout/>*/}
            {/*</Route>*/}
            {/*<Route path={'/admin'}>*/}
            {/*    <AdminLayout/>*/}
            {/*</Route>*/}
            {/*<Route path={'*'} element={<Error/>}/>*/}

            <Route path="/" element={<ClientLayout/>}/>
            <Route path="admin/*" element={<AdminLayout/>}/>
            <Route path={'admin/login'} element={<Login/>}/>
        </Routes>
    )
}




