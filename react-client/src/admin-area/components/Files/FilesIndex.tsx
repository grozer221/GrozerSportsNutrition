import {useMutation, useQuery} from '@apollo/client';
import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {GET_FILES_QUERY, GetFilesData, GetFilesVars} from '../../gql/files-query';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Avatar, Button, Divider, message, Table} from 'antd';
import {FileType} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {REMOVE_FILE_MUTATION, RemoveFileData, RemoveFileVars} from '../../gql/files-mutation';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../../redux/files-reducer';
import {s_getLoading} from '../../../redux/files.selectors';
import s from './FilesIndex.module.css';
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
                    likeOriginalName: '',
                    likeMimetype: '',
                },
            },
            context: {gqlLink: gqlLinks.admin},
        },
    );
    const searchFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY, {context: {gqlLink: gqlLinks.admin}});
    const [removeFile, removeFileOptions] = useMutation<RemoveFileData, RemoveFileVars>(REMOVE_FILE_MUTATION, {context: {gqlLink: gqlLinks.admin}});
    const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
    const uploadLoading = useSelector(s_getLoading);
    const dispatch = useDispatch();
    const [searchFileName, setSearchFileName] = useState<string>('');

    const onRemove = async (id: number) => {
        const response = await removeFile({variables: {id: id}});
        if (response.data && !response.errors) {
            dispatch(actions.setLoading(true));
            if (searchFileName.trim() === '') {
                await getFilesQuery.refetch({
                    getFilesInput: {
                        skip: pageSkip,
                        take: pageTake,
                        likeOriginalName: '',
                        likeMimetype: '',
                    },
                });
            } else {
                await searchFilesQuery.refetch({
                    getFilesInput: {
                        skip: pageSkip,
                        take: pageTake,
                        likeOriginalName: searchFileName,
                        likeMimetype: '',
                    },
                });
            }
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
        setPageSkip(0);
        setSearchFileName(value);
        if (value.trim() === '')
            return;

        dispatch(actions.setLoading(true));
        await searchFilesQuery.refetch({
            getFilesInput: {
                skip: 0,
                take: pageTake,
                likeOriginalName: value,
                likeMimetype: '',
            },
        });
        dispatch(actions.setLoading(false));
    };


    const debouncedSearch = useCallback(debounce(nextValue => onSearch(nextValue), 500), []);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => debouncedSearch(e.target.value);

    if (getFilesQuery.loading)
        return <Loading/>;

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
                <Search placeholder="Search" onChange={handleSearch} enterButton className={s.search}
                        loading={searchFilesQuery.loading}/>
            </div>
            <Divider/>
            <div>
                <Table
                    loading={getFilesQuery.loading || removeFileOptions.loading || uploadLoading || searchFilesQuery.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={searchFileName.trim() === ''
                        ? getFilesQuery.data?.getFiles.files.map(file => ({key: file.id, ...file}))
                        : searchFilesQuery.data?.getFiles.files.map(file => ({key: file.id, ...file}))
                    }
                    pagination={{
                        total: searchFileName.trim() === '' ? getFilesQuery.data?.getFiles.total : searchFilesQuery.data?.getFiles.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setPageSkip(pageSkip);
                            if (searchFileName.trim() === '') {
                                await getFilesQuery.refetch({
                                    getFilesInput: {
                                        skip: pageSkip,
                                        take: pageTake,
                                        likeOriginalName: searchFileName,
                                        likeMimetype: '',
                                    },
                                });
                            } else {
                                await searchFilesQuery.refetch({
                                    getFilesInput: {
                                        skip: pageSkip,
                                        take: pageTake,
                                        likeOriginalName: searchFileName,
                                        likeMimetype: '',
                                    },
                                });
                            }
                        },
                        // onShowSizeChange: async (pageNumber, pageSize) => {
                        //     setPageTake(pageSize);
                        //     if (searchFileName.trim() === '') {
                        //         await refetch({
                        //             getFilesInput: {
                        //                 skip: (pageNumber - 1) * pageTake,
                        //                 take: pageTake,
                        //                 likeOriginalName: searchFileName,
                        //                 likeMimetype: '',
                        //             },
                        //         });
                        //     } else {
                        //         await searchFilesQuery.refetch({
                        //             getFilesInput: {
                        //                 skip: (pageNumber - 1) * pageTake,
                        //                 take: pageTake,
                        //                 likeOriginalName: searchFileName,
                        //                 likeMimetype: '',
                        //             },
                        //         });
                        //     }
                        // },
                    }}
                />
            </div>
        </>
    );
};
