import {useMutation} from '@apollo/client';
import {Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PAGE_MUTATION, CreatePageData, CreatePageVars} from '../../gql/pages-mutation';
import {WysiwygEditor} from '../../../common-area/components/WysiwygEditor/WysiwygEditor';
import {gqlLinks} from '../../../common-area/gql/client';

export const PagesCreate: FC = () => {
    const [createPage, createPageOption] = useMutation<CreatePageData, CreatePageVars>(CREATE_PAGE_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(true);
    const [text, setText] = useState<string>('');

    const onFinish = async (values: {
        name: string,
    }) => {
        debugger
        const response = await createPage({
            variables: {
                createPageInput: {
                    ...values,
                    isShown: isShown,
                    text: text,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
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
            <Form.Item label={'Text'}>
                <WysiwygEditor text={text} setText={setText}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={createPageOption.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
