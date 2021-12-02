import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';
import {DeleteOutlined, EyeOutlined, FormOutlined} from '@ant-design/icons';
import s from './ButtonsVUR.module.css';

type Props = {
    viewUrl?: string,
    onView?: () => void,
    updateUrl?: string,
    onUpdate?: () => void,
    removeUrl?: string,
    onRemove?: () => void,
}

export const ButtonsVUR: FC<Props> = ({viewUrl, updateUrl, removeUrl, onView, onUpdate, onRemove}) => {
    return (
        <>
            <div className={s.buttonsVUR}>
                {onView ?
                    <div className={s.buttonView} onClick={onView}>
                        <Avatar size={28} icon={<EyeOutlined/>}/>
                    </div>
                    : viewUrl &&
                    <Link to={viewUrl} className={s.buttonView}>
                        <Avatar size={28} icon={<EyeOutlined/>}/>
                    </Link>
                }
                {onUpdate ?
                    <div className={s.buttonView} onClick={onUpdate}>
                        <Avatar size={28} icon={<EyeOutlined/>}/>
                    </div>
                    : updateUrl &&
                    <Link to={updateUrl} className={s.buttonUpdate}>
                        <Avatar size={28} icon={<FormOutlined/>}/>
                    </Link>
                }
                {onRemove ?
                    <div className={s.buttonRemove} onClick={onRemove}>
                        <Avatar size={28} icon={<DeleteOutlined/>}/>
                    </div>
                    : removeUrl &&
                    <Link to={removeUrl} className={s.buttonRemove}>
                        <Avatar size={28} icon={<DeleteOutlined/>}/>
                    </Link>
                }
            </div>
        </>
    );
};
