import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ClientLayout} from './client-area/Layout/ClientLayout';
import {useQuery} from '@apollo/client';
import {ME_QUERY, MeData, MeVars} from './admin-area/GraphQL/auth-query';
import {useDispatch} from 'react-redux';
import {actions} from './redux/auth-reducer';
import {Loading} from './components/Loading/Loading';
import {AdminLayout} from './admin-area/components/Layout/AdminLayout';
import {Login} from './admin-area/components/Login/Login';
import './App.css';
import 'antd/dist/antd.css';


export const App: FC = () => {
    const dispatch = useDispatch();
    const {loading, error, data} = useQuery<MeData, MeVars>(ME_QUERY);
    const [isInitialised, setIsInitialised] = useState(false);

    useEffect(() => {
        if (data && !error) {
            dispatch(actions.setAuthData(data.me, true));
            setIsInitialised(true);
        }
        if (error)
            setIsInitialised(true);
    }, [data, error]);

    if (loading || !isInitialised)
        return <Loading/>;

    return (
        <Routes>
            <Route path="/" element={<ClientLayout/>}/>
            <Route path="admin/*" element={<AdminLayout/>}/>
            <Route path={'admin/login'} element={<Login/>}/>
        </Routes>
    );
};




