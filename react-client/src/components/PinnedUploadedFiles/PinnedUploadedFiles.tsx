import React from 'react';
import {Avatar, Table} from 'antd';
import {ButtonsVUR} from '../../admin-area/components/ButtonsVUD/ButtonsVUR';
import {FileType} from '../../types/types';
import s from './PinnedUploadedFiles.module.css';

type Props = {
    files: FileType[],
    setFiles: (files: FileType[]) => void,
    loading: boolean,
}

export const PinnedUploadedFiles: React.FC<Props> = ({loading, files, setFiles}) => {

    const clickRemoveHandler = (fileRemove: FileType) => {
        const newFiles = files.filter(file => file !== fileRemove);
        setFiles(newFiles);
    };

    const columns = [
        {
            title: 'Image',
            key: 'image',
            render: (text: any, file: FileType) => {
                return (
                    <Avatar shape={'square'} size={48} src={file.fileImage} alt={file.fileName}/>
                );

            },
        },
        {
            title: 'Original name',
            dataIndex: 'originalName',
            key: 'originalName',
        },
        {
            title: 'File name',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: any, file: FileType) => (
                <ButtonsVUR onRemove={() => clickRemoveHandler(file)}/>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={files} pagination={false} loading={loading} rowKey={'id'}/>
    );
};
