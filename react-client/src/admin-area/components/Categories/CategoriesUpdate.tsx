import {useMutation, useQuery} from '@apollo/client';
import {Button, Form, Input, message, Switch} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {GET_CATEGORY_QUERY, GetCategoryData, GetCategoryVars} from '../../gql/categories-query';
import {UPDATE_CATEGORY_MUTATION, UpdateCategoryData, UpdateCategoryVars} from '../../gql/categories-mutation';
import {WysiwygEditor} from '../../../common-area/components/WysiwygEditor/WysiwygEditor';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';

export const CategoriesUpdate: FC = () => {
    const params = useParams();
    const categorySlug = params.slug || '';
    const getCategoryQuery = useQuery<GetCategoryData, GetCategoryVars>(
        GET_CATEGORY_QUERY,
        {
            variables: {slug: categorySlug},
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [updateCategory, updateCategoryOption] = useMutation<UpdateCategoryData, UpdateCategoryVars>(UPDATE_CATEGORY_MUTATION,
        {context: {gqlLink: gqlLinks.admin}},
    );
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (getCategoryQuery.data?.getCategory) {
            setIsShown(getCategoryQuery.data.getCategory.isShown);
            setDescription(getCategoryQuery.data.getCategory.description);
        }
    }, [getCategoryQuery.data?.getCategory]);

    const onFinish = async (values: {
        id: string,
        name: string,
    }) => {
        const intId = parseInt(values.id);
        updateCategory({
            variables: {
                updateCategoryInput: {
                    ...values,
                    id: intId,
                    isShown: isShown,
                    description: description,
                },
            },
        })
            .then(() => navigate('..'))
            .catch(error => message.error(error.message));
    };

    if (!categorySlug || getCategoryQuery.error)
        return <Error/>;

    if (getCategoryQuery.loading)
        return <Loading/>;

    return (
        <Form name="updateCategory" onFinish={onFinish}
              initialValues={{
                  id: getCategoryQuery.data?.getCategory.id,
                  name: getCategoryQuery.data?.getCategory.name,
                  description: getCategoryQuery.data?.getCategory.description,
              }}>
            <Form.Item name="id" style={{display: 'none'}}>
                <Input type={'hidden'}/>
            </Form.Item>
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
                <Button type="primary" htmlType={'submit'}
                        loading={getCategoryQuery.loading || updateCategoryOption.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
