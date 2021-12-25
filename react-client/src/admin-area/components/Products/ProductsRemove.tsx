import React, {FC, useState} from 'react';
import {ModalWindow} from '../../../components/Modal/ModalWindow';
import {useMutation} from '@apollo/client';
import {REMOVE_PRODUCTS_MUTATION, RemoveProductsData, RemoveProductsVars} from '../../GraphQL/products-mutation';
import {ProductView} from './ProductView';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Button} from 'antd';
import {Error} from '../Error/Error';

type Props = {
    visible: boolean,
    productId: number | undefined,
    productName: string | undefined,
    setVisible: (flag: boolean) => void
}

// export const FilesRemove: FC<Props> = ({visible, productId, productName, setVisible}) => {
//     const [removeProduct] = useMutation<ProductRemoveData, ProductRemoveVars>(PRODUCT_REMOVE_MUTATION);
//
//     const [confirmLoading, setConfirmLoading] = useState(false);
//     const modalText = `Do you really want to delete product <strong>${productName}</strong>`;
//
//
//     const handleCancel = () => {
//         console.log('canceled', productName);
//         setVisible(false);
//     };
//
//     if (!productId)
//         return null;
//
//     const handleOk = async () => {
//         console.log('ok', productName);
//         setConfirmLoading(true);
//         const response = await removeProduct({variables: {id: productId}});
//         if (response.data?.removeProduct) {
//             setConfirmLoading(false);
//             setVisible(false);
//         } else
//             console.log(response.errors);
//     };
//
//     return (
//         <ModalWindow
//             visible={visible}
//             title={'Confirmation'}
//             modalText={modalText}
//             handleCancel={handleCancel}
//             handleOk={handleOk}
//             confirmLoading={confirmLoading}
//         />
//     );
// };

export const ProductsRemove: FC = () => {
    const params = useParams();
    const [removeProduct, {loading}] = useMutation<RemoveProductsData, RemoveProductsVars>(REMOVE_PRODUCTS_MUTATION);
    const navigate = useNavigate();

    if (!params || !params.id)
        return <Navigate to={'../../error'}/>;

    const onRemove = async () => {
        const response = await removeProduct({variables: {id: parseInt(params.id as string)}});
        if (response.data)
            navigate('..');
        else
            console.log(response.errors);
    };

    return (
        <>
            <ProductView/>
            <Button onClick={onRemove} loading={loading}>Remove</Button>
        </>
    );
};
