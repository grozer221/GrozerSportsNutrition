import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './ClientLayout.module.css';
import {Home} from '../Home/Home';
import {Error} from '../Error/Error';
import {Pages} from '../Pages/Pages';
import {MyBreadcrumb} from '../../components/MyBreadcrumb/MyBreadcrumb';
import {PagesView} from '../PageView/PageView';

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
                <div>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/pages/:slug'} element={<PagesView/>}/>
                        <Route path={'*'} element={<Error/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
};
