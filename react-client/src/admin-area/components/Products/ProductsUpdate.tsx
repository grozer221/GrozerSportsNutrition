import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Space, Switch} from 'antd';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {UPDATE_PRODUCT_MUTATION, UpdateProductData, UpdateProductVars} from '../../GraphQL/products-mutation';
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
import {Category, Characteristic, FileType} from '../../../types/types';
import {updateFileInput} from '../../GraphQL/files-mutation';
import {WysiwygEditor} from '../../../components/WysiwygEditor/WysiwygEditor';
import {
    GET_CATEGORIES_QUERY,
    GET_CATEGORY_BY_NAME_QUERY,
    GetCategoriesData,
    GetCategoriesVars,
    GetCategoryByNameData,
    GetCategoryByNameVars,
} from '../../GraphQL/categories-query';
import {sizeFormItem} from '../../styles/sizeFormItem';

const {Search} = Input;

export const ProductsUpdate: FC = () => {
    const params = useParams();
    const productSlug = params.slug || '';
    const getProductQuery = useQuery<GetProductData, GetProductVars>(
        GET_PRODUCT_QUERY,
        {variables: {slug: productSlug}},
    );
    const [updateProduct] = useMutation<UpdateProductData, UpdateProductVars>(UPDATE_PRODUCT_MUTATION);
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY);
    const [searchedPhotosNames, setSearchedPhotosNames] = useState<{ value: string }[]>([]);
    const [photos, setPhotos] = useState([] as FileType[]);

    const getCategoriesQuery = useQuery<GetCategoriesData, GetCategoriesVars>(GET_CATEGORIES_QUERY);
    const getCategoryByName = useQuery<GetCategoryByNameData, GetCategoryByNameVars>(GET_CATEGORY_BY_NAME_QUERY);
    const [searchedCategoryNames, setSearchedCategoryNames] = useState<{ value: string }[]>([]);
    const [categories, setCategories] = useState([] as Category[]);

    useEffect(() => {
        if (getProductQuery.data) {
            setIsShown(getProductQuery.data.getProduct.isShown);
            setPhotos(getProductQuery.data.getProduct.files);
            setCategories(getProductQuery.data.getProduct.categories);
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
        const response = await updateProduct({
            variables: {
                updateProductInput: {
                    ...values,
                    id: intId,
                    isShown: isShown,
                    quantity: intQuantity,
                    priceUAH: intPriceUAH,
                    description: description,
                    files: files,
                },
            },
        });
        if (response.data && !response.errors) {
            navigate('..');
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
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
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const onSearchPhotoHandler = async (value: string) => {
        if (value.trim() === '') {
            setSearchedPhotosNames([]);
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
            setSearchedPhotosNames(response.data.getFiles.files.map(file => ({value: file.fileName})));
            if (!response.data.getFiles.files.length) {
                message.warning('Photos with current name not found');
            }
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const debouncedSearchPhotoHandler = useCallback(debounce(nextValue => onSearchPhotoHandler(nextValue), 500), []);
    const searchPhotoHandler = (value: string) => debouncedSearchPhotoHandler(value);


    const selectCategoryHandler = async (value: string) => {
        if (categories.some(category => category.name === value)) {
            message.warning('You already added this category');
            return;
        }
        const response = await getCategoryByName.refetch({
            name: value,
        });
        if (!response.errors) {
            setCategories([...categories, response.data.getCategoryByName]);
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const onSearchCategoryHandler = async (value: string) => {
        if (value.trim() === '') {
            setSearchedCategoryNames([]);
            return;
        }
        const response = await getCategoriesQuery.refetch({
            getCategoriesInput: {
                skip: 0,
                take: 5,
            },
        });
        if (!response.errors) {
            setSearchedCategoryNames(response.data.getCategories.categories.map(category => ({value: category.name})));
            if (!response.data.getCategories.categories.length) {
                message.warning('Categories with current name not found');
            }
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    const debouncedSearchCategoriesHandler = useCallback(debounce(nextValue => onSearchCategoryHandler(nextValue), 500), []);
    const searchCategoriesHandler = (value: string) => debouncedSearchCategoriesHandler(value);

    if (!productSlug)
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
            <Form.Item name="id" style={{display: 'none'}}>
                <Input type={'hidden'} style={{display: 'none'}}/>
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
                label="Photos"
            >
                <AutoComplete
                    options={searchedPhotosNames}
                    onSearch={searchPhotoHandler}
                    onSelect={selectPhotoHandler}
                >
                    <Search placeholder="Find in uploaded files" enterButton
                            loading={getFileByName.loading || getFilesQuery.loading}/>
                </AutoComplete>
            </Form.Item>
            {photos.length > 0 && (
                <Form.Item>
                    <PinnedUploadedFiles loading={getProductQuery.loading || getFileByName.loading} files={photos}
                                         setFiles={setPhotos}/>
                </Form.Item>
            )}
            <Form.Item
                {...sizeFormItem}
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
                {...sizeFormItem}
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
                {...sizeFormItem}
                label={'Description'}
            >
                <WysiwygEditor text={description} setText={setDescription}/>
            </Form.Item>
            {/*<Form.Item*/}
            {/*    label="Categories"*/}
            {/*>*/}
            {/*    <div className={s.photosAdd}>*/}
            {/*        <AutoComplete*/}
            {/*            options={searchedCategoryNames}*/}
            {/*            placeholder="Search in categories"*/}
            {/*            onSearch={searchCategoriesHandler}*/}
            {/*            onSelect={selectCategoryHandler}*/}
            {/*        />*/}
            {/*        <div className={s.wrapperLoading}>*/}
            {/*            {getCategoryByName.loading && <Loading/>}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Form.Item>*/}
            {/*{categories.length > 0 && (*/}
            {/*    <Form.Item>*/}
            {/*        <PinnedCategories loading={getProductQuery.loading || getCategoryByName.loading}*/}
            {/*                          categories={categories}*/}
            {/*                          setCategories={setCategories}/>*/}
            {/*    </Form.Item>*/}
            {/*)}*/}
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
