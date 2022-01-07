import {useQuery} from '@apollo/client';
import React, {FC} from 'react';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {GET_USERS_QUERY, GetUsersData, GetUsersVars} from '../../gql/users-query';
import {gqlLinks} from '../../../common-area/gql/client';
import {message} from 'antd';

export const UsersIndex: FC = () => {
    const getUserQuery = useQuery<GetUsersData, GetUsersVars>(
        GET_USERS_QUERY,
        {
            variables: {getUsersInput: {skip: 0, take: 5}},
            context: {gqlLink: gqlLinks.admin},
        },
    );

    if (getUserQuery.loading)
        return <Loading/>;

    if (getUserQuery.error) {
        message.error(getUserQuery.error);
    }

    return (
        <>
            <ul>
                {getUserQuery.data?.getUsers.map(user => (
                    <li key={user.id}>
                        <div>{user.email}</div>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                        <ul>{user.roles.map(role => (
                            <li key={role.id}>{role.name}</li>
                        ))}</ul>
                    </li>
                ))}
            </ul>
        </>
    );
};
