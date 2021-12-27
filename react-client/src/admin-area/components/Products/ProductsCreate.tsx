import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, Space, Switch} from 'antd';
import React, {FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCTS_MUTATION, CreateProductsData, CreateProductsVars} from '../../GraphQL/products-mutation';
import s from './ProductsCreate.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {s_getLoading} from '../../../redux/files.selectors';
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
import {actions} from '../../../redux/files-reducer';
import {Characteristic, FileType} from '../../../types/types';
import {PinnedUploadedFiles} from '../../../components/PinnedUploadedFiles/PinnedUploadedFiles';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

export const ProductsCreate: FC = () => {
    const [createProduct, {
        loading,
    }] = useMutation<CreateProductsData, CreateProductsVars>(CREATE_PRODUCTS_MUTATION);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY);
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY);
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([] as FileType[]);
    const loadingUpload = useSelector(s_getLoading);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [isShown, setIsShown] = useState<boolean>(true);
    const dispatch = useDispatch();

    const onFinish = async (values: {
        name: string,
        quantity: string,
        priceUAH: string,
        description: string,
        characteristics: Characteristic[]
    }) => {
        const intQuantity = parseInt(values.quantity);
        const intPriceUAH = parseInt(values.priceUAH);
        const filesIds = photos.map(photo => photo.id);
        const createProductsVars: CreateProductsVars = {
            createProductInput: {
                ...values,
                quantity: intQuantity,
                priceUAH: intPriceUAH,
                isShown,
                filesIds,
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
        dispatch(actions.setLoading(true));
        const response = await getFilesQuery.refetch({
            getFilesInput: {
                skip: 0,
                take: 5,
                likeOriginalName: value,
                likeMimetype: 'image',
            },
        });
        dispatch(actions.setLoading(false));
        if (!response.errors) {
            setOptions(response.data.getFiles.files.map(file => ({value: file.fileName})));
        } else {
            console.log(response.errors);
        }
    };

    const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    const handleSearch = (value: string) => debouncedSearch(value);

    const selectPhotoHandler = async (value: string) => {
        console.log('selected: ' + value);
        dispatch(actions.setLoading(true));
        const response = await getFileByName.refetch({
            fileName: value,
        });
        console.log(response);
        setPhotos([...photos, response.data.getFileByName]);
        dispatch(actions.setLoading(false));
    };

    console.log(getFilesQuery.networkStatus);
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
                        {loadingUpload && <Loading/>}
                    </div>
                </div>
            </Form.Item>
            {photos.length > 0 && (
                <Form.Item>
                    <PinnedUploadedFiles loading={loading || loadingUpload} files={photos} setFiles={setPhotos}/>
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
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input product description',
                    },
                ]}
            >
                <Input placeholder="Description"/>
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
                <Button type="primary" htmlType={'submit'} loading={loading || loadingUpload}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
