import {useQuery} from '@apollo/client';
import React, {FC} from 'react';
import {Loading} from '../../../../components/Loading/Loading';
import {GetUsersData, GetUsersVars, GET_USERS_QUERY} from '../../../GraphQL/users-query';

export const UsersIndex: FC = () => {
    console.log('UsersIndex')
    const {loading, error, data} = useQuery<GetUsersData, GetUsersVars>(
        GET_USERS_QUERY,
        {variables: {getUsersInput: {skip: 0, take: 5}}}
    );

    if (loading)
        return <Loading/>

    if (error)
        console.log(error)

    return (
        <>
            <ul>
                {data?.getUsers.map(user => (
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
    )
}
