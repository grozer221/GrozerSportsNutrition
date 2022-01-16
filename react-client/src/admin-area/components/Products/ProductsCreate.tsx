import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Button, Form, Input, message, Space, Switch} from 'antd';
import React, {FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCT_MUTATION, CreateProductData, CreateProductVars} from '../../gql/products-mutation';
import debounce from 'lodash.debounce';
import {
    GET_FILE_BY_NAME_QUERY,
    GET_FILES_QUERY,
    GetFileByNameData,
    GetFileByNameVars,
    GetFilesData,
    GetFilesVars,
} from '../../gql/files-query';
import {Category, Characteristic, FileType} from '../../../types/types';
import {PinnedUploadedFiles} from '../../../common-area/components/PinnedUploadedFiles/PinnedUploadedFiles';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {WysiwygEditor} from '../../../common-area/components/WysiwygEditor/WysiwygEditor';
import {sizeFormItem} from '../../styles/sizeFormItem';
import {gqlLinks} from '../../../common-area/gql/client';
import {
    GET_CATEGORIES_QUERY,
    GET_CATEGORY_BY_NAME_QUERY,
    GetCategoriesData,
    GetCategoriesVars,
    GetCategoryByNameData,
    GetCategoryByNameVars,
} from '../../gql/categories-query';
import {PinnedCategories} from '../../../common-area/components/PinnedCategories/PinnedCategories';
import {updateCategoryInput} from '../../gql/categories-mutation';

const {Search} = Input;

export const ProductsCreate: FC = () => {
    const [createProduct, createProductOption] = useMutation<CreateProductData, CreateProductVars>(CREATE_PRODUCT_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(GET_FILE_BY_NAME_QUERY, {context: {gqlLink: gqlLinks.admin}});
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY, {context: {gqlLink: gqlLinks.admin}});
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([] as FileType[]);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [isShown, setIsShown] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');

    const getCategoriesQuery = useQuery<GetCategoriesData, GetCategoriesVars>(GET_CATEGORIES_QUERY, {context: {gqlLink: gqlLinks.admin}});
    const getCategoryByName = useQuery<GetCategoryByNameData, GetCategoryByNameVars>(GET_CATEGORY_BY_NAME_QUERY, {context: {gqlLink: gqlLinks.admin}});
    const [searchedCategoryNames, setSearchedCategoryNames] = useState<{ value: string }[]>([]);
    const [categories, setCategories] = useState([] as Category[]);


    const onFinish = async (values: {
        name: string,
        quantity: string,
        priceUAH: string,
        characteristics: Characteristic[]
    }) => {
        const intQuantity = parseInt(values.quantity);
        const intPriceUAH = parseInt(values.priceUAH);
        const characteristics = values.characteristics || [];
        const photosWithoutExtra = photos.map(photo => {
            const {filePath, fileImage, ...rest} = photo;
            return rest;
        });
        const categoriesWithoutExtra: updateCategoryInput[] = categories.map(category => {
            const {slug, products, ...rest} = category;
            return rest;
        });
        const createProductsVars: CreateProductVars = {
            createProductInput: {
                ...values,
                isShown,
                quantity: intQuantity,
                priceUAH: intPriceUAH,
                description: description,
                characteristics: characteristics,
                files: photosWithoutExtra,
                categories: categoriesWithoutExtra,
            },
        };
        createProduct({variables: createProductsVars})
            .then(() => navigate('..'))
            .catch(error => message.error(error.message));
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
                likeFileName: value,
                likeMimetype: 'image',
            },
        });
        if (!response.errors) {
            setOptions(response.data.getFiles.files.map(file => ({value: file.fileName})));
            if (!response.data.getFiles.files.length) {
                message.warning('Photos with current name not found');
            }
        } else {
            response.errors?.forEach(error => message.error(error.message));
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
            response.errors?.forEach(error => message.error(error.message));
        }
    };


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
                take: 10,
                likeName: value,
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


    return (
        <Form name="createProduct" onFinish={onFinish}>
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
                    options={options}
                    onSearch={handleSearch}
                    onSelect={selectPhotoHandler}
                >
                    <Search placeholder="Search in files" enterButton
                            loading={getFileByName.loading || getFilesQuery.loading}/>
                </AutoComplete>
            </Form.Item>
            {photos.length > 0 && (
                <Form.Item>
                    <PinnedUploadedFiles loading={createProductOption.loading}
                                         files={photos} setFiles={setPhotos}/>
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
                <Input placeholder="Quantity" type={'number'} addonAfter={'Units'}/>
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
            <Form.List

                name="characteristics"
            >
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
            <Form.Item
                label="Categories"
            >
                <AutoComplete
                    options={searchedCategoryNames}
                    onSearch={searchCategoriesHandler}
                    onSelect={selectCategoryHandler}
                >
                    <Search placeholder="Search categories" enterButton
                            loading={getCategoriesQuery.loading || getCategoryByName.loading}/>
                </AutoComplete>
            </Form.Item>
            {categories.length > 0 && (
                <Form.Item>
                    <PinnedCategories loading={getCategoriesQuery.loading || getCategoryByName.loading}
                                      categories={categories}
                                      setCategories={setCategories}/>
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType={'submit'}
                        loading={createProductOption.loading || getFilesQuery.loading || getFileByName.loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
