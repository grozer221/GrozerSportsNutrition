import {useQuery} from '@apollo/client';
import React, {FC, useState} from 'react';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {GET_USERS_QUERY, GetUsersData, GetUsersVars} from '../../gql/users-query';
import {gqlLinks} from '../../../common-area/gql/client';
import {Divider, message, Table, Tag} from 'antd';
import {User} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import s from './UsersIndex.module.css';

export const UsersIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const getUserQuery = useQuery<GetUsersData, GetUsersVars>(
        GET_USERS_QUERY,
        {
            variables: {getUsersInput: {skip: pageSkip, take: pageTake}},
            context: {gqlLink: gqlLinks.admin},
        },
    );

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
            render: (text: any, user: User) => (
                <ButtonsVUR viewUrl={`${user.email}`} updateUrl={`update/${user.email}`}
                    /*onRemove={() => onRemove(page.slug)}*//>
            ),
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
                loading={getUserQuery.loading}
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
