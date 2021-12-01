import {useMutation} from '@apollo/client';
import {Button, Form, Input, Upload} from 'antd';
import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCT_MUTATION, CreateProductData, CreateProductVars} from '../../../GraphQL/products-mutation';
import ImgCrop from 'antd-img-crop';
import {UploadFile} from 'antd/es/upload/interface';

export const ProductCreate: FC = () => {
    const [createProduct, {
        loading,
    }] = useMutation<CreateProductData, CreateProductVars>(CREATE_PRODUCT_MUTATION);
    const navigate = useNavigate();

    const onFinish = async (values: { name: string }) => {
        console.log('Received values of form: ', values);
        const response = await createProduct({variables: {createProductInput: {...values}}});
        console.log(response);
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChange = (e: any) => {
        setFileList(e.fileList);
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handler = () => {

    };

    return (
        <Form name="createProduct" onFinish={onFinish}>
            <ImgCrop rotate>
                <Upload
                    action={window.location.protocol + '//' + window.location.host + '/api/files/upload'}
                    listType="picture-card"
                    fileList={fileList as UploadFile<any>[]}
                    onChange={onChange}
                    onPreview={onPreview}
                    maxCount={20}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </ImgCrop>
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
                <Input placeholder="Product name"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
