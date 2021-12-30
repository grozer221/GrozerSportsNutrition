import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Space, Switch} from 'antd';
import React, {FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCT_MUTATION, CreateProductData, CreateProductVars} from '../../GraphQL/products-mutation';
import s from './ProductsCreate.module.css';
import debounce from 'lodash.debounce';
import {
    GET_FILE_BY_NAME_QUERY,
    GET_FILES_QUERY,
    GetFileByNameData,
    GetFileByNameVars,
    GetFilesData,
    GetFilesVars,
} from '../../GraphQL/files-query';
import {Loading} from '../../../components/Loading/Loading';
import {Characteristic, FileType} from '../../../types/types';
import {PinnedUploadedFiles} from '../../../components/PinnedUploadedFiles/PinnedUploadedFiles';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {WysiwygEditor} from '../../../components/WysiwygEditor/WysiwygEditor';

export const ProductsCreate: FC = () => {
    const [createProduct, createProductOption] = useMutation<CreateProductData, CreateProductVars>(CREATE_PRODUCT_MUTATION);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY);
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY);
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([] as FileType[]);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [isShown, setIsShown] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');

    const onFinish = async (values: {
        name: string,
        quantity: string,
        priceUAH: string,
        characteristics: Characteristic[]
    }) => {
        const intQuantity = parseInt(values.quantity);
        const intPriceUAH = parseInt(values.priceUAH);
        const createProductsVars: CreateProductVars = {
            createProductInput: {
                ...values,
                isShown,
                quantity: intQuantity,
                priceUAH: intPriceUAH,
                description: description,
                files: photos,
            },
        };
        console.log(createProductsVars);
        const response = await createProduct({variables: createProductsVars});
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
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

    const selectPhotoHandler = async (value: string) => {
        if (photos.some(photo => photo.fileName === value)) {
            message.warning('You already added this photo');
            return;
        }
        console.log('selected: ' + value);
        const response = await getFileByName.refetch({
            fileName: value,
        });
        if (!response.errors) {
            setPhotos([...photos, response.data.getFileByName]);
        } else {
            console.log(response.errors);
        }
    };

    return (
        <Form name="createProduct" onFinish={onFinish}>
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
                        placeholder="Search in files"
                        onSearch={handleSearch}
                        onSelect={selectPhotoHandler}
                    />
                    <div className={s.wrapperLoading}>
                        {(getFileByName.loading || getFilesQuery.loading) && <Loading/>}
                    </div>
                </div>
            </Form.Item>
            {photos.length > 0 && (
                <Form.Item>
                    <PinnedUploadedFiles loading={createProductOption.loading}
                                         files={photos} setFiles={setPhotos}/>
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
                <Input placeholder="Quantity" type={'number'} addonAfter={'Units'}/>
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
                <Button type="primary" htmlType={'submit'}
                        loading={createProductOption.loading || getFilesQuery.loading || getFileByName.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
