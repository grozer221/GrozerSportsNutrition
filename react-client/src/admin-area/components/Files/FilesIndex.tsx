import {useMutation, useQuery} from '@apollo/client';
import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {GET_FILES_QUERY, GetFilesData, GetFilesVars} from '../../gql/files-query';
import {Avatar, Button, Divider, message, Table} from 'antd';
import {FileType} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {REMOVE_FILE_MUTATION, RemoveFileData, RemoveFileVars} from '../../gql/files-mutation';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../../redux/files-reducer';
import {s_getLoading} from '../../../redux/files.selectors';
import debounce from 'lodash.debounce';
import Search from 'antd/es/input/Search';
import {gqlLinks} from '../../../common-area/gql/client';

export const FilesIndex: FC = () => {
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const getFilesQuery = useQuery<GetFilesData, GetFilesVars>(
        GET_FILES_QUERY,
        {
            variables: {
                getFilesInput: {
                    skip: pageSkip,
                    take: pageTake,
                    likeFileName: '',
                    likeMimetype: '',
                },
            },
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const [removeFile, removeFileOptions] = useMutation<RemoveFileData, RemoveFileVars>(REMOVE_FILE_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
    const uploadLoading = useSelector(s_getLoading);
    const dispatch = useDispatch();
    const [searchFileName, setSearchFileName] = useState<string>('');

    const onRemove = async (id: number) => {
        const response = await removeFile({variables: {id: id}});
        if (response.data && !response.errors) {
            dispatch(actions.setLoading(true));
            await getFilesQuery.refetch({
                getFilesInput: {
                    skip: pageSkip,
                    take: pageTake,
                    likeFileName: searchFileName,
                    likeMimetype: '',
                },
            });
            dispatch(actions.setLoading(false));
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
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
            dataIndex: 'image',
            key: 'image',
            render: (text: any, file: FileType) => (
                <Avatar size={48} shape={'square'} src={file.fileImage}/>
            ),
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
            title: 'Mimetype',
            dataIndex: 'mimetype',
            key: 'fileName',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Actions',
            dataIndex: 'size',
            key: 'size',
            render: (text: any, file: FileType) => (
                <ButtonsVUR onRemove={() => onRemove(file.id)} viewUrlA={file.filePath}/>
            ),
        },
    ];

    const onSearch = async (value: string) => {
        const newPageSkip = 0;
        setPageSkip(newPageSkip);
        setSearchFileName(value);
        await getFilesQuery.refetch({
            getFilesInput: {
                skip: newPageSkip,
                take: pageTake,
                likeFileName: value,
                likeMimetype: '',
            },
        });
    };


    const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => debouncedSearch(e.target.value);

    if (getFilesQuery.error) {
        message.error(getFilesQuery.error.message);
    }

    return (
        <>
            <div className="wrapperHeader">
                <div className="wrapperHeader">
                    <header>Files</header>
                    <Link to={'create'}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <Search placeholder="Search" onChange={handleSearch} enterButton className="search"
                        loading={getFilesQuery.loading}/>
            </div>
            <Divider/>
            <div>
                <Table
                    loading={getFilesQuery.loading || removeFileOptions.loading || uploadLoading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={getFilesQuery.data?.getFiles.files}
                    rowKey={'id'}
                    pagination={{
                        total: getFilesQuery.data?.getFiles.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setPageSkip(pageSkip);
                            await getFilesQuery.refetch({
                                getFilesInput: {
                                    skip: pageSkip,
                                    take: pageTake,
                                    likeFileName: searchFileName,
                                    likeMimetype: '',
                                },
                            });
                        },
                    }}
                />
            </div>
        </>
    );
};
