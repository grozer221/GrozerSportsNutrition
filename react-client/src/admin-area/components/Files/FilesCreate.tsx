import {Avatar, Button, Form} from 'antd';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_FILES_MUTATION, CreateFilesData, CreateFilesVars} from '../../GraphQL/files-mutation';
import {useMutation} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';
import {PinnedFiles} from '../../../components/PinnedFiles/PinnedFiles';
import {PlusOutlined} from '@ant-design/icons';
import s from './FilesCreate.module.css';
import {actions, upload} from '../../../redux/files-reducer';
import {s_getLoading, s_getUploadedFiles} from '../../../redux/files.selectors';

export const FilesCreate: FC = () => {
    const dispatch = useDispatch();
    const [createFile, {
        loading,
    }] = useMutation<CreateFilesData, CreateFilesVars>(CREATE_FILES_MUTATION);
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
                if (response.errors)
                    console.log(response.errors);
            });
            dispatch(actions.setUploadedFiles([]));
            navigate('..');
        }
    }, [uploadedFiles]);

    const onFinish = async () => {
        if (files.length) {
            dispatch(upload(files));
        }
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

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
