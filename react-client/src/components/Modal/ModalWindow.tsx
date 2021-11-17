import React, {FC} from 'react';
import {Modal} from 'antd';

type Props = {
    visible: boolean,
    handleCancel: () => void
    handleOk: () => void,
    confirmLoading: boolean,
    modalText: string,
    title: string
}

export const ModalWindow: FC<Props> = ({visible, handleCancel, handleOk, confirmLoading, modalText, title}) => {
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
    );
};
