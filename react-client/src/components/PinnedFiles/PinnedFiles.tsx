import React from 'react';
import {Avatar, Table} from 'antd';
import {ButtonsVUR} from '../../admin-area/components/ButtonsVUD/ButtonsVUR';

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
                            src={regex && regex.length ? URL.createObjectURL(file) : 'https://www.colinfoss.com/wp-content/uploads/2019/10/document.png'}
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
            title: 'Actions',
            key: 'actions',
            render: (text: any, file: File) => (
                <ButtonsVUR onRemove={() => clickRemoveHandler(file)}/>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={files} pagination={false} loading={loading}/>
    );
};
