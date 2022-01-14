import {useMutation, useQuery} from '@apollo/client';
import {Button, Form, Input, message, Transfer} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';
import {GET_USER_QUERY, GetUserData, GetUserVars} from '../../gql/users-query';
import {RoleName} from '../../../types/types';
import {UPDATE_USER_MUTATION, updateRoleInput, UpdateUserData, UpdateUserVars} from '../../gql/users-mutation';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {GET_ROLES_QUERY, GetRolesData, GetRolesVars} from '../../gql/roles-query';

export const UsersUpdate: FC = () => {
    const params = useParams();
    const userEmail = params.email || '';
    const getUserQuery = useQuery<GetUserData, GetUserVars>(GET_USER_QUERY,
        {
            variables: {email: userEmail},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const getRolesQuery = useQuery<GetRolesData, GetRolesVars>(GET_ROLES_QUERY,
        {
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [updateUserMutation, updateUserMutationOptions] = useMutation<UpdateUserData, UpdateUserVars>(UPDATE_USER_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const navigate = useNavigate();

    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const onChange = (nextTargetKeys: string[], direction: any, moveKeys: any) => {
        if (getRolesQuery.data) {
            console.log('nextTargetKeys', nextTargetKeys);
            const idCustomerRole = getRolesQuery.data.getRoles.find(role => role.name === RoleName.customer)?.id.toString() as string;
            if (nextTargetKeys.some(key => key === idCustomerRole)) {
                setTargetKeys(nextTargetKeys);
            } else {
                setTargetKeys([...nextTargetKeys, idCustomerRole]);
            }
        }

    };

    const onSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
        // @ts-ignore
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    useEffect(() => {
        if (getUserQuery.data?.getUser) {
            setTargetKeys(getUserQuery.data.getUser.roles.map(role => role.id.toString()));
        }
    }, [getUserQuery.data?.getUser]);

    const onFinish = async (values: {
        id: string,
        email: string,
        firstName: string,
        lastName: string,
    }) => {
        const parsedId = parseInt(values.id);
        let newRoles: updateRoleInput[];
        if (getRolesQuery.data) {
            newRoles = getRolesQuery.data?.getRoles
                .filter(role => targetKeys.some(key => key === role.id.toString()))
                .map(role => {
                    const {color, ...rest} = role;
                    return rest;
                });
        } else {
            newRoles = [];
        }
        console.log();
        const response = await updateUserMutation({
            variables: {
                updateUserInput: {
                    ...values,
                    id: parsedId,
                    roles: newRoles,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    if (!userEmail || getUserQuery.error)
        return <Error/>;

    if (getUserQuery.loading)
        return <Loading/>;

    return (
        <Form name="updateUser"
              onFinish={onFinish}
              initialValues={{
                  id: getUserQuery.data?.getUser.id,
                  email: getUserQuery.data?.getUser.email,
                  firstName: getUserQuery.data?.getUser.firstName,
                  lastName: getUserQuery.data?.getUser.lastName,
              }}
              {...sizeFormItem}
        >
            <Form.Item name="id" style={{display: 'none'}}>
                <Input type={'hidden'}/>
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder={'E-mail'} type={'email'}/>
            </Form.Item>
            <Form.Item
                name="firstName"
                label="FirstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your FirstName!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder={'FirstName'}/>
            </Form.Item>
            <Form.Item
                name="lastName"
                label="LastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your LastName!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder={'LastName'}/>
            </Form.Item>
            <Form.Item label={'Roles'}>
                <Transfer
                    dataSource={getRolesQuery.data?.getRoles}
                    titles={['Rest roles', `User roles`]}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    render={role => role.name}
                    rowKey={role => role.id.toString()}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'}
                        loading={getUserQuery.loading || updateUserMutationOptions.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
