import {useMutation} from '@apollo/client';
import {Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_CATEGORY_MUTATION, CreateCategoryData, CreateCategoryVars} from '../../gql/categories-mutation';
import {WysiwygEditor} from '../../../common-area/components/WysiwygEditor/WysiwygEditor';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {gqlLinks} from '../../../common-area/gql/client';

export const CategoriesCreate: FC = () => {
    const [createCategory, createCategoryOptions] = useMutation<CreateCategoryData, CreateCategoryVars>(CREATE_CATEGORY_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');

    const onFinish = async (values: {
        name: string,
    }) => {
        const response = await createCategory({
            variables: {
                createCategoryInput: {
                    ...values,
                    isShown,
                    description: description,
                },
            },
        });
        if (!response.errors) {
            navigate('..');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    return (
        <Form name="createCategory" onFinish={onFinish}>
            <Form.Item
                {...sizeFormItem}
                name="isShown"
                label="Is shown"
            >
                <Switch size={'small'} checked={isShown} onChange={setIsShown}/>
            </Form.Item>
            <Form.Item
                {...sizeFormItem}
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
                {...sizeFormItem}
                label={'Description'}
            >
                <WysiwygEditor text={description} setText={setDescription}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={createCategoryOptions.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
