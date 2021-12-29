import {useMutation, useQuery} from '@apollo/client';
import {Button, Form, Input, Switch} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import s from './PagesUpdate.module.css';
import {Loading} from '../../../components/Loading/Loading';
import {GET_PAGE_QUERY, GetPageData, GetPageVars} from '../../GraphQL/pages-query';
import {UPDATE_PAGE_MUTATION, UpdatePageData, UpdatePageVars} from '../../GraphQL/pages-mutation';

export const PagesUpdate: FC = () => {
    const params = useParams();
    const pageId = params.id ? parseInt(params.id) : 0;
    const getPageQuery = useQuery<GetPageData, GetPageVars>(
        GET_PAGE_QUERY,
        {variables: {id: pageId}},
    );
    const [updatePage] = useMutation<UpdatePageData, UpdatePageVars>(UPDATE_PAGE_MUTATION);
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);

    useEffect(() => {
        if (getPageQuery.data?.getPage) {
            setIsShown(getPageQuery.data.getPage.isShown);
        }
    }, [getPageQuery.data?.getPage]);

    const onFinish = async (values: {
        id: string,
        name: string,
        text: string,
    }) => {
        const intId = parseInt(values.id);
        const response = await updatePage({
            variables: {
                updatePageInput: {
                    ...values,
                    id: intId,
                    isShown: isShown,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (getPageQuery.loading)
        return <Loading/>;

    if (getPageQuery.error)
        console.log(getPageQuery.error);

    return (
        <Form name="updateProduct" onFinish={onFinish}
              initialValues={{
                  id: getPageQuery.data?.getPage.id,
                  name: getPageQuery.data?.getPage.name,
                  text: getPageQuery.data?.getPage.text,
              }}>
            <Form.Item name="id" className={s.inputId}>
                <Input type={'hidden'} className={s.inputId}/>
            </Form.Item>
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
                        message: 'Please input page name',
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
                <Button type="primary" htmlType={'submit'} loading={getPageQuery.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};