import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ClientLayout} from './client-area/components/Layout/ClientLayout';
import {useQuery} from '@apollo/client';
import {ME_QUERY, MeData, MeVars} from './common-area/gql/auth-query';
import {useDispatch} from 'react-redux';
import {actions, login} from './redux/auth-reducer';
import {Loading} from './common-area/components/Loading/Loading';
import {AdminLayout} from './admin-area/components/Layout/AdminLayout';
import {AuthLogin} from './admin-area/components/Auth/AuthLogin';
import 'antd/dist/antd.css';
import './App.css';
import {gqlLinks} from './common-area/gql/client';

export const App: FC = () => {
        const dispatch = useDispatch();
        const meQuery = useQuery<MeData, MeVars>(ME_QUERY, {context: {gqlLink: gqlLinks.customer}});
        const [isInitialised, setIsInitialised] = useState(false);

        useEffect(() => {
            if (meQuery.data && !meQuery.error) {
                dispatch(login(meQuery.data.me));
                setIsInitialised(true);
            }
            if (meQuery.error) {
                setIsInitialised(true);
            }
        }, [meQuery.data, meQuery.error]);

        if (meQuery.loading || !isInitialised)
            return <Loading/>;

        return (
            <Routes>
                <Route path="admin/*" element={<AdminLayout/>}/>
                <Route path="/*" element={<ClientLayout/>}/>
                <Route path={'admin/auth/login'} element={<AuthLogin/>}/>
            </Routes>
        );
    }
;




