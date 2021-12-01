import {Avatar, Button, Form} from 'antd';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_FILE_MUTATION, CreateFileData, CreateFileVars} from '../../../GraphQL/files-mutation';
import {useMutation} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';
import {PinnedFiles} from '../../../../components/PinnedFiles/PinnedFiles';
import {PlusOutlined} from '@ant-design/icons';
import s from './FilesCreate.module.css';
import {actions, upload} from '../../../../redux/files-reducer';
import {s_getLoading, s_getUploadedFiles} from '../../../../redux/files.selectors';

export const FilesCreate: FC = () => {
    const dispatch = useDispatch();
    const [createFile, {
        loading,
    }] = useMutation<CreateFileData, CreateFileVars>(CREATE_FILE_MUTATION);
    const navigate = useNavigate();
    const [files, setFiles] = useState([] as File[]);
    const uploadedFiles = useSelector(s_getUploadedFiles);
    const loadingUpload = useSelector(s_getLoading);

    useEffect(() => {
        if (uploadedFiles.length) {
            uploadedFiles.forEach(async (file) => {
                console.log('upload file: ', file);
                const response = await createFile({
                    variables: {createFileInput: {...file}},
                });
            });
            navigate('..');
            dispatch(actions.setUploadedFiles([]));
        }
    }, [uploadedFiles]);

    const onFinish = async () => {
        if (files.length) {
            dispatch(actions.setLoading(true));
            dispatch(upload(files));
        }
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            files && files.length > 0
                ? setFiles([...Array.from(files), ...Array.from(e.target.files)])
                : setFiles(Array.from(e.target.files));
        }
    };

    console.log(files);

    return (
        <Form name="createFile" onFinish={onFinish}>
            <Form.Item>
                <input type="file" id="file" multiple style={{display: 'none'}} onChange={fileChangeHandler}/>
                <label className={s.labelFile} htmlFor="file">
                    <Avatar icon={<PlusOutlined/>}/>
                </label>
            </Form.Item>

            {files.length > 0 && (
                <>
                    <Form.Item>
                        <PinnedFiles loading={loading || loadingUpload} files={files} setFiles={setFiles}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType={'submit'} loading={loading || loadingUpload}>
                            Create
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};
