import {useMutation, useQuery} from '@apollo/client';
import {Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Loading} from '../../../components/Loading/Loading';
import {GET_PAGE_QUERY, GetPageData, GetPageVars} from '../../GraphQL/pages-query';
import {UPDATE_PAGE_MUTATION, UpdatePageData, UpdatePageVars} from '../../GraphQL/pages-mutation';
import {WysiwygEditor} from '../../../components/WysiwygEditor/WysiwygEditor';

export const PagesUpdate: FC = () => {
    const params = useParams();
    const pageSlug = params.slug || '';
    const getPageQuery = useQuery<GetPageData, GetPageVars>(
        GET_PAGE_QUERY,
        {variables: {slug: pageSlug}},
    );
    const [updatePage] = useMutation<UpdatePageData, UpdatePageVars>(UPDATE_PAGE_MUTATION);
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (getPageQuery.data?.getPage) {
            setIsShown(getPageQuery.data.getPage.isShown);
            setText(getPageQuery.data.getPage.text);
        }
    }, [getPageQuery.data?.getPage]);

    const onFinish = async (values: {
        id: string,
        sorting: string,
        name: string,
    }) => {
        const intId = parseInt(values.id);
        const intSorting = parseInt(values.sorting);
        const response = await updatePage({
            variables: {
                updatePageInput: {
                    ...values,
                    id: intId,
                    sorting: intSorting,
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

    if (!pageSlug || getPageQuery.error)
        return <Navigate to={'../../error'}/>;

    if (getPageQuery.loading)
        return <Loading/>;

    return (
        <Form name="updateProduct" onFinish={onFinish}
              initialValues={{
                  id: getPageQuery.data?.getPage.id,
                  name: getPageQuery.data?.getPage.name,
                  sorting: getPageQuery.data?.getPage.sorting,
              }}>
            <Form.Item name="id" style={{display: 'none'}}>
                <Input type={'hidden'}/>
            </Form.Item>
            <Form.Item name="sorting" style={{display: 'none'}}>
                <Input type={'hidden'}/>
            </Form.Item>
            <Form.Item
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
                        message: 'Please input page name',
                    },
                ]}
            >
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item label={'Text'}>
                <WysiwygEditor text={text} setText={setText}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={getPageQuery.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
