import React, {ChangeEvent, FC} from 'react';
import {Avatar, Input, Table} from 'antd';
import {ButtonsVUR} from '../../../admin-area/components/ButtonsVUD/ButtonsVUR';
import {FileName} from '../../../types/types';

type EditableColumnProps = {
    file: File,
    index: number,
    filesNames: FileName[],
    setFilesNames: (fileNames: FileName[]) => void,
}

const EditableColumn: FC<EditableColumnProps> = ({file, index, filesNames, setFilesNames}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilesNames = filesNames.map((fileName, i) => {
            if (i === index)
                return ({originalName: file.name, newName: e.target.value});
            return fileName;
        });
        setFilesNames(newFilesNames);
    };

    return (
        <>
            <Input value={filesNames[index].newName} onChange={onChangeHandler}/>
            {filesNames[index].newName.trim() === '' &&
            <div className={'errorMessage'}>File name can not be empty</div>}
        </>
    );
};


type Props = {
    files: File[],
    setFiles: (files: File[]) => void,
    filesNames: FileName[],
    setFilesNames: (filesNames: FileName[]) => void,
    loading: boolean,
}
export const PinnedFiles: React.FC<Props> = ({loading, files, setFiles, filesNames, setFilesNames}) => {

    const clickRemoveHandler = (fileRemove: File, index: number) => {
        const newFiles = files.filter(file => file !== fileRemove);
        setFiles(newFiles);
        const newFilesNames = filesNames.filter((fileName, i) => i !== index);
        setFilesNames(newFilesNames);
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
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
            render: (text: any, file: File) => <EditableColumn file={file} index={files.indexOf(file)}
                                                               filesNames={filesNames} setFilesNames={setFilesNames}/>,
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
            render: (text: any, file: File) => (
                <ButtonsVUR onRemove={() => clickRemoveHandler(file, files.indexOf(file))}/>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={files} pagination={false} loading={loading}/>
    );
};
