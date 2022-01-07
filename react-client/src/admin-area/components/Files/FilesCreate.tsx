import {Avatar, Button, Form, message} from 'antd';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CREATE_FILE_MUTATION, CreateFileData, CreateFileVars} from '../../gql/files-mutation';
import {useMutation} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';
import {PinnedFiles} from '../../../common-area/components/PinnedFiles/PinnedFiles';
import {PlusOutlined} from '@ant-design/icons';
import s from './FilesCreate.module.css';
import {actions, upload} from '../../../redux/files-reducer';
import {s_getLoading, s_getUploadedFiles} from '../../../redux/files.selectors';
import {FileName} from '../../../types/types';
import {gqlLinks} from '../../../common-area/gql/client';

export const FilesCreate: FC = () => {
    const [createFile, createFileOptions] = useMutation<CreateFileData, CreateFileVars>(CREATE_FILE_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [files, setFiles] = useState([] as File[]);
    const [filesNames, setFilesNames] = useState([] as FileName[]);
    const uploadedFiles = useSelector(s_getUploadedFiles);
    const loadingUpload = useSelector(s_getLoading);

    useEffect(() => {
        if (uploadedFiles.length) {
            uploadedFiles.forEach(async (file) => {
                console.log('upload file: ', file);
                const response = await createFile({
                    variables: {createFileInput: {...file}},
                });
                if (response.errors) {
                    response.errors?.forEach(error => message.error(error.message));
                }
            });
            dispatch(actions.setUploadedFiles([]));
            navigate('..');
        }
    }, [uploadedFiles]);

    const onFinish = async () => {
        if (files.length) {
            dispatch(upload(files, filesNames));
        }
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const newFiles = Array.from(e.target.files);
            setFilesNames([...filesNames, ...newFiles.map(file => ({newName: file.name, originalName: file.name}))]);
            setFiles([...files, ...newFiles]);
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
                        <PinnedFiles loading={createFileOptions.loading || loadingUpload} files={files}
                                     setFiles={setFiles} filesNames={filesNames} setFilesNames={setFilesNames}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType={'submit'} loading={createFileOptions.loading || loadingUpload}>
                            Create
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};
