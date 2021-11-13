import React, {FC} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Route, Routes} from "react-router-dom";
import {AppLayout as AdminLayout} from "./admin-area/components/Layout/AppLayout";
import {AppLayout} from "./client-area/Layout/AppLayout";
import {Login as AdminLogin} from "./admin-area/components/Login/Login";


export const App: FC = () => {
    return (
        <Routes>
            <Route path={'/admin/login'} element={<AdminLogin/>}/>
            <Route path={'/admin*'} element={<AdminLayout/>}/>
            <Route path={'*'} element={<AppLayout/>}/>
        </Routes>
    )
}
