import React, {FC} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Loading} from '../../../common-area/components/Loading/Loading';
import {Avatar, Card, message} from 'antd';
import s from './FilesView.module.css';
import {GET_FILE_QUERY, GetFileData, GetFileVars} from '../../gql/files-query';
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';
import {gqlLinks} from '../../../common-area/gql/client';
import {Error} from '../Error/Error';

const {Meta} = Card;

export const FilesView: FC = () => {
    const params = useParams();
    const getFileQuery = useQuery<GetFileData, GetFileVars>(
        GET_FILE_QUERY,
        {
            variables: {id: params.id ? parseInt(params.id) : 0},
            context: {gqlLink: gqlLinks.admin},
        },
    );

    if (!params.id)
        return <Error/>;

    if (getFileQuery.loading)
        return <Loading/>;

    if (getFileQuery.error) {
        message.error(getFileQuery.error);
    }

    return (
        <>
            <Card
                className={s.card}
                cover={
                    <Avatar
                        shape={'square'}
                        size={300}
                        src={getFileQuery.data?.getFile.filePath}
                    />
                }
                actions={[
                    <Link to={`../update/${getFileQuery.data?.getFile.id}`} className={'buttonUpdate'}>
                        <Avatar size={28} icon={<FormOutlined/>}/>
                    </Link>,
                    <Link to={`../remove/${getFileQuery.data?.getFile.id}`} className={'buttonRemove'}>
                        <Avatar size={28} icon={<DeleteOutlined/>}/>
                    </Link>,
                ]}
            >
                <Meta
                    title={getFileQuery.data?.getFile.originalName}
                    description={(
                        <>
                            <div>Size: {getFileQuery.data?.getFile.size}</div>
                            <div>Mimetype: {getFileQuery.data?.getFile.mimetype}</div>
                        </>
                    )}
                />
            </Card>,
        </>
    );
};
