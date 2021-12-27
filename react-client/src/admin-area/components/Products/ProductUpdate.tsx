import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, Space, Switch} from 'antd';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {UPDATE_PRODUCTS_MUTATION, UpdateProductsData, UpdateProductsVars} from '../../GraphQL/products-mutation';
import s from './ProductUpdate.module.css';
import {GET_PRODUCT_QUERY, GetProductData, GetProductVars} from '../../GraphQL/products-query';
import {Loading} from '../../../components/Loading/Loading';
import {PinnedUploadedFiles} from '../../../components/PinnedUploadedFiles/PinnedUploadedFiles';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {s_getLoading} from '../../../redux/files.selectors';
import {actions} from '../../../redux/files-reducer';
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

export const ProductUpdate: FC = () => {
    const params = useParams();

    const {loading, error, data} = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {variables: {id: params.id ? parseInt(params.id) : 0}},
    );
    const [updateProduct] = useMutation<UpdateProductsData, UpdateProductsVars>(UPDATE_PRODUCTS_MUTATION);
    const navigate = useNavigate();
    const loadingUpload = useSelector(s_getLoading);
    const [isShown, setIsShown] = useState<boolean>(false);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const dispatch = useDispatch();
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY);
    const [photos, setPhotos] = useState([] as FileType[]);


    useEffect(() => {
        if (data) {
            setIsShown(data.getProduct.isShown);
            setPhotos(data.getProduct.files);
        }
    }, [data]);

    const onFinish = async (values: {
        id: string,
        name: string,
        quantity: string,
        priceUAH: string,
        description: string,
        characteristics: Characteristic[]
    }) => {
        const intId = parseInt(values.id);
        const intQuantity = parseInt(values.quantity);
        const intPriceUAH = parseInt(values.priceUAH);
        const filesIds = photos.map(photo => photo.id);
        const updateProductsVars: UpdateProductsVars = {
            updateProductInput: {
                ...values,
                id: intId,
                quantity: intQuantity,
                priceUAH: intPriceUAH,
                isShown,
                filesIds,
            },
        };
        console.log(updateProductsVars);
        const response = await updateProduct({variables: updateProductsVars});
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

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

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    return (
        <Form name="updateProduct" onFinish={onFinish}
              initialValues={{
                  id: data?.getProduct.id,
                  name: data?.getProduct.name,
                  quantity: data?.getProduct.quantity,
                  priceUAH: data?.getProduct.priceUAH,
                  description: data?.getProduct.description,
                  characteristics: data?.getProduct.characteristics,
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
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};
