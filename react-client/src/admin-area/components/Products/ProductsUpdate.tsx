import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Space, Switch} from 'antd';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {UPDATE_PRODUCT_MUTATION, UpdateProductData, UpdateProductVars} from '../../GraphQL/products-mutation';
import s from './ProductsUpdate.module.css';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../GraphQL/products-query';
import {Loading} from '../../../components/Loading/Loading';
import {PinnedUploadedFiles} from '../../../components/PinnedUploadedFiles/PinnedUploadedFiles';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';
import {
    GET_FILE_BY_NAME_QUERY,
    GET_FILES_QUERY,
    GetFileByNameData,
    GetFileByNameVars,
    GetFilesData,
    GetFilesVars,
} from '../../GraphQL/files-query';
import {Characteristic, FileType} from '../../../types/types';
import {updateFileInput} from '../../GraphQL/files-mutation';
import {WysiwygEditor} from '../../../components/WysiwygEditor/WysiwygEditor';

export const ProductsUpdate: FC = () => {
    const params = useParams();

    const getProductQuery = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {variables: {id: params.id ? parseInt(params.id) : 0}},
    );
    const [updateProduct] = useMutation<UpdateProductData, UpdateProductVars>(UPDATE_PRODUCT_MUTATION);
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY);
    const [photos, setPhotos] = useState([] as FileType[]);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (getProductQuery.data) {
            setIsShown(getProductQuery.data.getProduct.isShown);
            setPhotos(getProductQuery.data.getProduct.files);
            setDescription(getProductQuery.data.getProduct.description);
        }
    }, [getProductQuery.data]);

    const onFinish = async (values: {
        id: string,
        name: string,
        quantity: string,
        priceUAH: string,
        characteristics: Characteristic[]
    }) => {
        const intId = parseInt(values.id);
        const intQuantity = parseInt(values.quantity);
        const intPriceUAH = parseInt(values.priceUAH);
        const files: updateFileInput[] = photos.map(photo => {
            const {fileImage, filePath, ...rest} = photo;
            return rest;
        });
        const updateProductsVars: UpdateProductVars = {
            updateProductInput: {
                ...values,
                id: intId,
                isShown: isShown,
                quantity: intQuantity,
                priceUAH: intPriceUAH,
                description: description,
                files: files,
            },
        };
        const response = await updateProduct({variables: updateProductsVars});
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

    const selectPhotoHandler = async (value: string) => {
        if (photos.some(photo => photo.fileName === value)) {
            message.warning('You already added this photo');
            return;
        }
        const response = await getFileByName.refetch({
            fileName: value,
        });
        if (!response.errors) {
            setPhotos([...photos, response.data.getFileByName]);
        } else {
            console.log(response.errors);
        }
    };

    const onSearch = async (value: string) => {
        if (value.trim() === '') {
            setOptions([]);
            return;
        }
        const response = await getFilesQuery.refetch({
            getFilesInput: {
                skip: 0,
                take: 5,
                likeOriginalName: value,
                likeMimetype: 'image',
            },
        });
        if (!response.errors) {
            setOptions(response.data.getFiles.files.map(file => ({value: file.fileName})));
            if (!response.data.getFiles.files.length) {
                message.warning('Photos with current name not found');
            }
        } else {
            console.log(response.errors);
        }
    };

    const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    const handleSearch = (value: string) => debouncedSearch(value);

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (getProductQuery.loading)
        return <Loading/>;

    if (getProductQuery.error)
        console.log(getProductQuery.error);

    return (
        <Form name="updateProduct" onFinish={onFinish}
              initialValues={{
                  id: getProductQuery.data?.getProduct.id,
                  name: getProductQuery.data?.getProduct.name,
                  quantity: getProductQuery.data?.getProduct.quantity,
                  priceUAH: getProductQuery.data?.getProduct.priceUAH,
                  description: getProductQuery.data?.getProduct.description,
                  characteristics: getProductQuery.data?.getProduct.characteristics,
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
                        message: 'Please input product name',
                    },
                ]}
            >
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item
                label="Photos"
            >
                <div className={s.photosAdd}>
                    <AutoComplete
                        options={options}
                        placeholder="Find in uploaded files"
                        onSearch={handleSearch}
                        onSelect={selectPhotoHandler}
                    />
                    <div className={s.wrapperLoading}>
                        {getFileByName.loading && <Loading/>}
                    </div>
                </div>
            </Form.Item>
            {photos.length > 0 && (
                <Form.Item>
                    <PinnedUploadedFiles loading={getProductQuery.loading || getFileByName.loading} files={photos}
                                         setFiles={setPhotos}/>
                </Form.Item>
            )}
            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    {
                        required: true,
                        message: 'Please input product quantity',
                    },
                ]}
            >
                <Input placeholder="Quantity" type={'number'}/>
            </Form.Item>
            <Form.Item
                name="priceUAH"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please input product price',
                    },
                ]}
            >
                <Input placeholder="Price" type={'number'} addonAfter="UAH"/>
            </Form.Item>
            <Form.Item label={'Description'}>
                <WysiwygEditor text={description} setText={setDescription}/>
            </Form.Item>
            <Form.List name="characteristics">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, ...restField}) => (
                            <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    rules={[{required: true, message: 'Missing name'}]}
                                >
                                    <Input placeholder="Name"/>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{required: true, message: 'Missing value'}]}
                                >
                                    <Input placeholder="Value"/>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add characteristic
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={getProductQuery.loading || getFilesQuery.loading}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
