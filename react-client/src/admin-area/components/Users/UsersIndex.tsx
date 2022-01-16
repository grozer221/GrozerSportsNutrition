import {useMutation, useQuery} from '@apollo/client';
import React, {ChangeEvent, FC, useCallback, useState} from 'react';
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
import Search from 'antd/es/input/Search';
import debounce from 'lodash.debounce';

export const UsersIndex: FC = () => {
    const authData = useSelector(s_getAuthData);
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const [searchLike, setSearchLike] = useState('');
    const getUserQuery = useQuery<GetUsersData, GetUsersVars>(
        GET_USERS_QUERY,
        {
            variables: {
                getUsersInput: {
                    skip: pageSkip,
                    take: pageTake,
                    like: searchLike,
                },
            },
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeUser, removeUserOptions] = useMutation<RemoveUserData, RemoveUserVars>(REMOVE_USER_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );


    const onRemove = async (email: string) => {
        const response = await removeUser({variables: {email: email}});
        if (response.data)
            await getUserQuery.refetch({
                getUsersInput: {
                    skip: pageSkip,
                    take: pageTake,
                    like: searchLike,
                },
            });
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

    const onSearchUsersHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const newPageSkip = 0;
        const newSearchLike = e.target.value;
        setPageSkip(newPageSkip);
        setSearchLike(newSearchLike);
        await getUserQuery.refetch({
            getUsersInput: {
                skip: newPageSkip,
                take: pageTake,
                like: newSearchLike,
            },
        });
    };

    const debouncedSearchUsersHandler = useCallback(debounce(nextValue => onSearchUsersHandler(nextValue), 500), []);
    const searchUsersHandler = (e: ChangeEvent<HTMLInputElement>) => debouncedSearchUsersHandler(e);

    if (getUserQuery.error) {
        message.error(getUserQuery.error);
    }

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Users</header>
                </div>
                <Search placeholder="Search users" className={'search'}
                        onChange={searchUsersHandler} enterButton
                        loading={getUserQuery.loading}/>
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
                        setPageSkip(pageSkip);
                        await getUserQuery.refetch({
                            getUsersInput: {
                                skip: pageSkip,
                                take: pageTake,
                                like: searchLike,
                            },
                        });
                    },
                }}
                rowKey="id"
            />
        </>
    );
};
