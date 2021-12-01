import {useQuery} from '@apollo/client';
import {Button} from 'antd';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {GET_FILES_QUERY, GetFilesData, GetFilesVars} from '../../../GraphQL/files-query';
import {Loading} from '../../../../components/Loading/Loading';

export const FilesIndex: FC = () => {
    const {loading, error, data} = useQuery<GetFilesData, GetFilesVars>(
        GET_FILES_QUERY,
        {variables: {getFilesInput: {skip: 0, take: 10}}},
    );

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    return (
        <>
            <Link to={'create'}>
                <Button>Create</Button>
            </Link>
            <ul>
                {data?.getFiles.map(file => (
                    <li key={file.id}>
                        <div>
                            <div>{file.originalName}</div>
                        </div>
                        <div>
                            <Link to={`../${file.id}`}>
                                <Button type={'default'}>View</Button>
                            </Link>
                            <Link to={`update/${file.id}`}>
                                <Button type={'ghost'}>Update</Button>
                            </Link>
                            <Link to={`remove/${file.id}`}>
                                <Button type={'primary'}>Remove</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

