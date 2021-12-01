import React from 'react';
import {Avatar, Table} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

type Props = {
    files: File[],
    setFiles: (files: File[]) => void,
    loading: boolean,
}

export const PinnedFiles: React.FC<Props> = ({loading, files, setFiles}) => {

    const clickRemoveHandler = (fileRemove: File) => {
        files = files.filter(file => file !== fileRemove);
        setFiles(files);
    };

    const columns = [
        {
            title: 'Image',
            key: 'image',
            render: (text: any, file: File) => {
                const regex = file.type.match(/image/);
                return (
                    <Avatar shape={'square'} size={48}
                            src={regex && regex.length ? URL.createObjectURL(file) : '/static/images/file.png'}
                            alt={file.name}/>
                );

            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, file: File) => (
                <button className={'buttonRemove'} onClick={() => clickRemoveHandler(file)}>
                    <Avatar size={24} icon={<DeleteOutlined/>}/>
                </button>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={files} pagination={false} loading={loading}/>
    );
};
