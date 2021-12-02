import React, {FC} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Loading} from '../../../../components/Loading/Loading';
import {Avatar, Card} from 'antd';
import s from './FilesView.module.css';
import {GET_FILE_QUERY, GetFileData, GetFileVars} from '../../../GraphQL/files-query';
import {urls} from '../../../../api/api';
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';

const {Meta} = Card;

export const FilesView: FC = () => {
    const params = useParams();

    const {loading, error, data} = useQuery<GetFileData, GetFileVars>(
        GET_FILE_QUERY,
        {variables: {id: params.id ? parseInt(params.id) : 0}},
    );

    if (!params.id)
        return <Navigate to={'../../error'}/>;

    if (loading)
        return <Loading/>;

    if (error)
        console.log(error);

    return (
        <>
            <Card
                className={s.card}
                cover={
                    <Avatar
                        shape={'square'}
                        size={300}
                        src={urls.server + data?.getFile.destination + '/' + data?.getFile.fileName}
                    />
                }
                actions={[
                    <Link to={`../update/${data?.getFile.id}`} className={'buttonUpdate'}>
                        <Avatar size={28} icon={<FormOutlined/>}/>
                    </Link>,
                    <Link to={`../remove/${data?.getFile.id}`} className={'buttonRemove'}>
                        <Avatar size={28} icon={<DeleteOutlined/>}/>
                    </Link>,
                ]}
            >
                <Meta
                    title={data?.getFile.originalName}
                    description={(
                        <>
                            <div>Size: {data?.getFile.size}</div>
                            <div>Mimetype: {data?.getFile.mimetype}</div>
                        </>
                    )}
                />
            </Card>,
        </>
    );
};
