import {useMutation, useQuery} from '@apollo/client';
import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {GET_FILES_QUERY, GetFilesData, GetFilesVars} from '../../GraphQL/files-query';
import {Loading} from '../../../components/Loading/Loading';
import {Avatar, Button, Divider, Table} from 'antd';
import {FileType} from '../../../types/types';
import {ButtonsVUR} from '../ButtonsVUD/ButtonsVUR';
import {REMOVE_FILE_MUTATION, RemoveFileData, RemoveFileVars} from '../../GraphQL/files-mutation';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../../redux/files-reducer';
import {s_getLoading} from '../../../redux/files.selectors';
import s from './FilesIndex.module.css';
import debounce from 'lodash.debounce';
import Search from 'antd/es/input/Search';

export const FilesIndex: FC = () => {
    const {loading, error, data, refetch} = useQuery<GetFilesData, GetFilesVars>(
        GET_FILES_QUERY,
        {
            variables: {
                getFilesInput: {
                    skip: 0,
                    take: 10,
                    likeOriginalName: '',
                    likeMimetype: '',
                },
            },
        },
    );
    const searchFilesQuery = useQuery<GetFilesData, GetFilesVars>(GET_FILES_QUERY);
    const [removeFile, removeFileOptions] = useMutation<RemoveFileData, RemoveFileVars>(REMOVE_FILE_MUTATION);
    const [pageTake, setPageTake] = useState(10);
    const [pageSkip, setPageSkip] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
    const uploadLoading = useSelector(s_getLoading);
    const dispatch = useDispatch();
    const [searchFileName, setSearchFileName] = useState<string>('');

    const onRemove = async (id: number) => {
        const response = await removeFile({variables: {id: id}});
        if (response.data) {
            dispatch(actions.setLoading(true));
            if (searchFileName.trim() === '') {
                await refetch({
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
        } else
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
            key: 'image',
            title: 'Image',
            render: (text: any, file: FileType) => (
                <Avatar size={48} shape={'square'} src={file.fileImage}/>
            ),
        },
        {
            key: 'originalName',
            title: 'Original name',
            dataIndex: 'originalName',
        },
        {
            key: 'fileName',
            title: 'File name',
            dataIndex: 'fileName',
        },
        {
            key: 'mimetype',
            title: 'Mimetype',
            dataIndex: 'mimetype',
        },
        {
            key: 'size',
            title: 'Size',
            dataIndex: 'size',
        },
        {
            key: 'actions',
            title: 'Actions',
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

    if (loading)
        return <Loading/>;
    if (error)
        console.log(error);

    return (
        <>
            <div className='wrapperHeader'>
                <div className='wrapperHeader'>
                    <header>Files</header>
                    <Link to={'create'}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <Search placeholder="Search" onChange={handleSearch} enterButton className={s.search}/>
            </div>
            <Divider/>;
            <div>
                <Table
                    loading={loading || removeFileOptions.loading || uploadLoading || searchFilesQuery.loading}
                    rowSelection={{...rowSelection}}
                    columns={columns}
                    dataSource={searchFileName.trim() === ''
                        ? data?.getFiles.files.map(file => ({key: file.id, ...file}))
                        : searchFilesQuery.data?.getFiles.files.map(file => ({key: file.id, ...file}))
                    }
                    pagination={{
                        total: searchFileName.trim() === '' ? data?.getFiles.total : searchFilesQuery.data?.getFiles.total,
                        onChange: async (pageNumber: number) => {
                            const pageSkip = (pageNumber - 1) * pageTake;
                            setPageSkip(pageSkip);
                            if (searchFileName.trim() === '') {
                                await refetch({
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
            </div>;
        </>
    )
        ;
};