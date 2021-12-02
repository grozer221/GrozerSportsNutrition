import {useMutation, useQuery} from '@apollo/client';
import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {GET_FILES_QUERY, GetFilesData, GetFilesVars} from '../../../GraphQL/files-query';
import {Loading} from '../../../../components/Loading/Loading';
import {Avatar, Button, Divider, Table} from 'antd';
import {FileType} from '../../../../types/types';
import {urls} from '../../../../api/api';
import {ButtonsVUR} from '../../ButtonsVUD/ButtonsVUR';
import {REMOVE_FILE_MUTATION, RemoveFileData, RemoveFileVars} from '../../../GraphQL/files-mutation';

export const FilesIndex: FC = () => {
    const {loading, error, data, refetch} = useQuery<GetFilesData, GetFilesVars>(
        GET_FILES_QUERY,
        {variables: {getFilesInput: {skip: 0, take: 10}}},
    );
    const [removeFile, removeFileOptions] = useMutation<RemoveFileData, RemoveFileVars>(REMOVE_FILE_MUTATION);

    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setSkipTake] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    const onRemove = async (id: number) => {
        const response = await removeFile({variables: {id: id}});
        if (response.data)
            await refetch({getFilesInput: {skip: pageSkip, take: pageTake}});
        else
            console.log(response.errors);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: FileType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedFiles(selectedRows);
        },
    };

    const columns = [
        {
            title: 'Image',
            render: (text: any, file: FileType) => {
                if (file.mimetype.match(/image/)?.length)
                    return (
                        <Avatar size={48} shape={'square'} src={urls.server + file.destination + '/' + file.fileName}/>
                    );
                return (
                    <Avatar size={48} shape={'square'} src={urls.server + 'static/images/file.png'}/>
                );

            },
        },
        {
            title: 'OriginalName',
            dataIndex: 'originalName',
            render: (text: any, file: FileType) => {
                return (
                    <a href={urls.server + file.destination + '/' + file.fileName} target={'_blank'}>
                        {text}
                    </a>
                );

            },
        },
        {
            title: 'Mimetype',
            dataIndex: 'mimetype',
        },
        {
            title: 'Size',
            dataIndex: 'size',
        },
        {
            title: 'Actions',
            render: (text: any, file: FileType) => (
                <ButtonsVUR /*updateUrl={`update/${file.id}`}*/ onRemove={() => onRemove(file.id)}/>
            ),
        },
    ];

    return (
        <>
            <Link to={'create'}>
                <Button>Create</Button>
            </Link>
            <Divider/>
            <div>
                <Table
                    loading={loading || removeFileOptions.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={data?.getFiles.files.map(file => ({key: file.id, ...file}))}

                    pagination={{
                        total: data?.getFiles.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setSkipTake(pageSkip);
                            await refetch({getFilesInput: {skip: pageSkip, take: pageTake}});
                        },
                        onShowSizeChange: async (pageNumber, pageSize) => {
                            setPageTake(pageSize);
                            await refetch({getFilesInput: {skip: (pageNumber - 1) * pageTake, take: pageTake}});
                        },
                    }}
                />
            </div>
        </>
    );
};
