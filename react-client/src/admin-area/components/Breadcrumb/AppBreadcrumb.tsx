import React, {FC} from 'react';
import {Breadcrumb} from 'antd';
import {useLocation} from 'react-router-dom';

export const AppBreadcrumb: FC = () => {
    const location = useLocation();
    let modules = location.pathname.split('/');
    modules = modules.filter(Boolean);

    return (
        <Breadcrumb>
            {modules.map(module => <Breadcrumb.Item>{module}</Breadcrumb.Item>)}
        </Breadcrumb>
    );
};
