import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './ClientLayout.module.css';
import {Home} from '../Home/Home';
import {Error} from '../Error/Error';
import {Pages} from '../Pages/Pages';
import {MyBreadcrumb} from '../../components/MyBreadcrumb/MyBreadcrumb';
import {EditableTable} from './Editable';

export const ClientLayout: FC = () => {
    console.log('client layout');
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
                        <Route path={'/editable'} element={<EditableTable/>}/>
                        <Route path={'*'} element={<Error/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
};
