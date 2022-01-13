import React, {FC} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {message, Tag} from 'antd';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';
import {GET_USER_QUERY, GetUserData, GetUserVars} from '../../gql/users-query';
import s from './UsersView.module.css';

export const UsersView: FC = () => {
    const params = useParams();
    const userEmail = params.email || '';
    const getUserQuery = useQuery<GetUserData, GetUserVars>(
        GET_USER_QUERY,
        {
            variables: {email: userEmail},
            context: {gqlLink: gqlLinks.admin},
        },
    );

    if (!userEmail)
        return <Error/>;

    if (getUserQuery.error) {
        message.error(getUserQuery.error);
    }

    if (getUserQuery.loading)
        return <Loading/>;

    const user = getUserQuery.data?.getUser;
    return (
        <>
            <div className={s.photosAndMainInfo}>
                <header>{user?.email}</header>
                <table className="infoTable">
                    <tbody>
                    <tr>
                        <td>Id:</td>
                        <td>
                            <span># {user?.id}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>FirstName:</td>
                        <td>
                            <span>{user?.firstName}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>LastName:</td>
                        <td>
                            <span>{user?.lastName}</span>
                        </td>
                    </tr>
                    {(user && user?.roles.length > 0) && (
                        <tr>
                            <td>Roles:</td>
                            <td className={s.roles}>
                                {user.roles.map(role => (
                                    <Tag key={role.id} color={role.color}>{role.name}</Tag>
                                ))}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
