import {useMutation, useQuery} from '@apollo/client';
import {Button, Form, Input, Switch} from 'antd';
import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {GET_FILE_BY_NAME_QUERY, GetFileByNameData, GetFileByNameVars} from '../../GraphQL/files-query';
import {CREATE_PAGE_MUTATION, CreatePageData, CreatePageVars} from '../../GraphQL/pages-mutation';

export const PagesCreate: FC = () => {
    const [createPage, createPageOption] = useMutation<CreatePageData, CreatePageVars>(CREATE_PAGE_MUTATION);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY);
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(true);

    const onFinish = async (values: {
        name: string,
        text: string,
    }) => {
        const response = await createPage({
            variables: {
                createPageInput: {
                    ...values,
                    isShown: isShown,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

    return (
        <Form name="createPage" onFinish={onFinish}>
            <Form.Item
                name="isShown"
                label="Is shown"
            >
                <Switch size={'small'} checked={isShown} onChange={setIsShown}/>
            </Form.Item>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name',
                    },
                ]}
            >
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item
                name="text"
                label="Text"
                rules={[
                    {
                        required: true,
                        message: 'Please input page text',
                    },
                ]}
            >
                <Input placeholder="Text"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={createPageOption.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
