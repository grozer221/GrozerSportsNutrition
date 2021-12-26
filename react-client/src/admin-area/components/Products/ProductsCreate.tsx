import {useMutation, useQuery} from '@apollo/client';
import {AutoComplete, Avatar, Button, Form, Input} from 'antd';
import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_PRODUCTS_MUTATION, CreateProductsData, CreateProductsVars} from '../../GraphQL/products-mutation';
import s from './ProductsCreate.module.css';
import {PlusOutlined} from '@ant-design/icons';
import {PinnedFiles} from '../../../components/PinnedFiles/PinnedFiles';
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

type Photo = (File & { isUploaded: boolean })

export const ProductsCreate: FC = () => {
    const [createProduct, {
        loading,
    }] = useMutation<CreateProductsData, CreateProductsVars>(CREATE_PRODUCTS_MUTATION);
    const getFileByName = useQuery<GetFileByNameData, GetFileByNameVars>(
        GET_FILE_BY_NAME_QUERY, {skip: true},
    );
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(
        GET_FILES_QUERY, {skip: true},
    );
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([] as Photo[]);
    const loadingUpload = useSelector(s_getLoading);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const dispatch = useDispatch();

    const onFinish = async (values: { name: string }) => {
        const response = await createProduct({variables: {createProductInput: {...values}}});
        console.log(response);
        if (response.data && !response.errors) {
            navigate('..');
        } else
            console.log('error:', response.errors);
    };

    const photoChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setPhotos([...photos, ...(Array.from(e.target.files)) as Photo[]]);
        }
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
        if (response.errors) {

        } else {
            setOptions(response.data.getFiles.files.map(file => ({value: file.fileName})));
        }
    };

    const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    const handleSearch = (value: string) => debouncedSearch(value);

    const selectPhotoHandler = async (value: string) => {
        console.log('selected: ' + value);
        dispatch(actions.setLoading(true));
        const selectedFile = await getFileByName.refetch({
            fileName: value,
        });
        console.log(selectedFile);
        // @ts-ignore
        setPhotos([...photos, {...selectedFile.data.getFileByName, isUploaded: false} as Photo]);
        dispatch(actions.setLoading(false));
    };

    console.log(getFilesQuery.networkStatus);
    return (
        <Form name="createProduct" onFinish={onFinish}>
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
            <Form.Item
                name="photos"
                label="Photos"
            >
                <div className={s.photosAdd}>
                    <input type="file" id="file" multiple style={{display: 'none'}} onChange={photoChangeHandler}/>
                    <label className={s.labelFile} htmlFor="file">
                        <Avatar icon={<PlusOutlined/>}/>
                    </label>
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
                <>
                    <Form.Item>
                        <PinnedFiles loading={loading || loadingUpload} files={photos}
                                     setFiles={setPhotos as (photos: File[]) => void}/>
                    </Form.Item>
                </>
            )}
            <Form.Item>
                <Button type="primary" htmlType={'submit'} loading={loading || loadingUpload}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};
