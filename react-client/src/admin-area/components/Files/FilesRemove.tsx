import React, {FC, useState} from 'react';
import {ModalWindow} from '../../../components/Modal/ModalWindow';
import {useMutation} from '@apollo/client';
import {FilesView} from './FilesView';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Button} from 'antd';
import {Error} from '../Error/Error';

type Props = {
    visible: boolean,
    productId: number | undefined,
    productName: string | undefined,
    setVisible: (flag: boolean) => void
}

export const FilesRemove: FC = () => {
    const params = useParams();
    // const [removeProduct, {loading}] = useMutation<ProductRemoveData, ProductRemoveVars>(PRODUCT_REMOVE_MUTATION);
    const navigate = useNavigate();

    if (!params || !params.id)
        return <Navigate to={'../../error'}/>;

    const onRemove = async () => {
        // const response = await removeProduct({variables: {id: parseInt(params.id as string)}});
        // if (response.data)
        //     navigate('..');
        // else
        //     console.log(response.errors);
    };

    return (
        <>
            <FilesView/>
            <Button onClick={onRemove} /*loading={loading}*/>Remove</Button>
        </>
    );
};
