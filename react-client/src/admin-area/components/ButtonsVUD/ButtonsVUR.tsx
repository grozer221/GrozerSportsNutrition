import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Popconfirm} from 'antd';
import {DeleteOutlined, EyeOutlined, FormOutlined} from '@ant-design/icons';
import s from './ButtonsVUR.module.css';

type Props = {
    viewUrlA?: string,
    viewUrl?: string,
    onView?: () => void,
    updateUrl?: string,
    onUpdate?: () => void,
    removeUrl?: string,
    onRemove?: () => void,
}

export const ButtonsVUR: FC<Props> = ({viewUrlA, viewUrl, updateUrl, removeUrl, onView, onUpdate, onRemove}) => {
    return (
        <>
            <div className={s.buttonsVUR}>
                {onView ?
                    <div className={s.buttonView} onClick={onView}>
                        <Avatar size={28} icon={<EyeOutlined/>}/>
                    </div>
                    : viewUrlA
                        ? <a href={viewUrlA} target={'blank'} className={s.buttonView}>
                            <Avatar size={28} icon={<EyeOutlined/>}/>
                        </a>
                        : viewUrl && <Link to={viewUrl} className={s.buttonView}>
                        <Avatar size={28} icon={<EyeOutlined/>}/>
                    </Link>
                }
                {onUpdate ?
                    <div className={s.buttonUpdate} onClick={onUpdate}>
                        <Avatar size={28} icon={<FormOutlined/>}/>
                    </div>
                    : updateUrl &&
                    <Link to={updateUrl} className={s.buttonUpdate}>
                        <Avatar size={28} icon={<FormOutlined/>}/>
                    </Link>
                }
                {onRemove ?
                    <Popconfirm
                        title="Are you sure that you want to delete?"
                        onConfirm={onRemove}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className={s.buttonRemove}>
                            <Avatar size={28} icon={<DeleteOutlined/>}/>
                        </div>
                    </Popconfirm>

                    : removeUrl &&
                    <Link to={removeUrl} className={s.buttonRemove}>
                        <Avatar size={28} icon={<DeleteOutlined/>}/>
                    </Link>
                }
            </div>
        </>
    );
};
