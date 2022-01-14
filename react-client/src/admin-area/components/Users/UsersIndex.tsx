import {useMutation, useQuery} from '@apollo/client';
import React, {FC, useState} from 'react';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {GET_USERS_QUERY, GetUsersData, GetUsersVars} from '../../gql/users-query';
import {gqlLinks} from '../../../common-area/gql/client';
import {Divider, message, Table, Tag} from 'antd';
import {User} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import s from './UsersIndex.module.css';
import {REMOVE_USER_MUTATION, RemoveUserData, RemoveUserVars} from '../../gql/users-mutation';
import {isAdmin} from '../../../utils/authorization';
import {useSelector} from 'react-redux';
import {s_getAuthData} from '../../../redux/auth-selectors';

export const UsersIndex: FC = () => {
    const authData = useSelector(s_getAuthData);
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const getUserQuery = useQuery<GetUsersData, GetUsersVars>(
        GET_USERS_QUERY,
        {
            variables: {getUsersInput: {skip: pageSkip, take: pageTake}},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeUser, removeUserOptions] = useMutation<RemoveUserData, RemoveUserVars>(REMOVE_USER_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );


    const onRemove = async (email: string) => {
        const response = await removeUser({variables: {email: email}});
        if (response.data)
            await getUserQuery.refetch({getUsersInput: {skip: pageSkip, take: pageTake}});
        else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, user: User) => <>#{user.id}</>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (text: any, user: User) => (
                <div className={s.roles}>
                    {user.roles.map(role => (
                        <Tag key={role.id} color={role.color}>{role.name}</Tag>
                    ))}
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, user: User) => {
                if (authData && isAdmin(authData?.user) && user.id !== authData?.user.id) {
                    return <ButtonsVUR viewUrl={`${user.email}`} updateUrl={`update/${user.email}`}
                                       onRemove={() => onRemove(user.email)}/>;
                } else {
                    return <ButtonsVUR viewUrl={`${user.email}`}/>;
                }
            },

        },
    ];

    if (getUserQuery.loading)
        return <Loading/>;

    if (getUserQuery.error) {
        message.error(getUserQuery.error);
    }

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Users</header>
                </div>
                <strong>search</strong>
            </div>
            <Divider/>
            <Table
                loading={getUserQuery.loading || removeUserOptions.loading}
                columns={columns}
                dataSource={getUserQuery.data?.getUsers.users}
                pagination={{
                    total: getUserQuery.data?.getUsers.total,
                    onChange: async (pageNumber: number) => {
                        const pageSkip = (pageNumber - 1) * pageTake;
                        setSkipTake(pageSkip);
                        await getUserQuery.refetch({
                            getUsersInput: {
                                skip: pageSkip,
                                take: pageTake,
                            },
                        });
                    },
                }}
                rowKey="id"
            />
        </>
    );
};
