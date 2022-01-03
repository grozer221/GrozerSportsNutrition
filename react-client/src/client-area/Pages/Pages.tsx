import React, {FC} from 'react';
import s from './Pages.module.css';
import {useQuery} from '@apollo/client';
import {GET_PAGES_QUERY, GetPagesData, GetPagesVars} from '../../admin-area/GraphQL/pages-query';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {s_getAuthData} from '../../redux/auth-selectors';
import {RoleName} from '../../types/types';

export const Pages: FC = () => {
    const getPagesQuery = useQuery<GetPagesData, GetPagesVars>(GET_PAGES_QUERY, {
        variables: {
            getPagesInput: {
                orderBy: 'sorting',
                orderByType: 'ASC',
                isShown: false,
            },
        },
    });
    const authData = useSelector(s_getAuthData);

    return (
        <div className={s.pages}>
            {getPagesQuery.data?.getPages.map(page => (
                <Link to={`/pages/${page.slug}`} className={s.page}>{page.name}</Link>
            ))}
            {authData?.user.roles.some(r => r.name === RoleName.moderator || r.name === RoleName.admin)
            && <Link to={`/admin`} className={s.page}>Admin Panel</Link>}
        </div>
    );
};
