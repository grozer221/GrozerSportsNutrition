import React, {FC} from 'react';
import {useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {s_getAuthData, s_getIsAuth} from '../../../redux/auth-selectors';
import s from './Pages.module.css';
import {gqlLinks} from '../../../common-area/gql/client';
import {GET_PAGES_QUERY, GetPagesData, GetPagesVars} from '../../gql/pages-query';
import {logout} from '../../../redux/auth-reducer';
import {isModeratorOrAdmin} from '../../../utils/authorization';

export const Pages: FC = () => {
    const getPagesQuery = useQuery<GetPagesData, GetPagesVars>(GET_PAGES_QUERY,
        {context: {gqlLink: gqlLinks.customer}},
    );
    const authData = useSelector(s_getAuthData);
    const isAuth = useSelector(s_getIsAuth);
    const dispatch = useDispatch();

    return (
        <div className={s.wrapperPages}>
            <div className={s.pages}>
                {getPagesQuery.data?.getPages.map(page => (
                    <Link key={page.id} to={`/pages/${page.slug}`} className={s.page}>{page.name}</Link>
                ))}
                {authData && isModeratorOrAdmin(authData.user)
                && <Link to={`/admin`} className={s.page}>Admin Panel</Link>
                }
            </div>
            {isAuth
                ? (
                    <div className={s.pages}>
                        <Link to={'/account'}>Account</Link>
                        <Link to={'#'} onClick={() => dispatch(logout())}>Logout</Link>
                    </div>
                )
                : (
                    <div className={s.pages}>
                        <Link to={'/auth/login'}>Login</Link>
                        <Link to={'/auth/register'}>Register</Link>
                    </div>
                )
            }
        </div>
    );
};
