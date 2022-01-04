import React, {FC} from 'react';
import {Breadcrumb} from 'antd';
import {useLocation} from 'react-router-dom';

export const MyBreadcrumb: FC = () => {
    const location = useLocation();
    let modules = location.pathname.split('/');
    modules = modules.filter(Boolean);

    return (
        <Breadcrumb>
            {modules.map((module, i) => {
                return (
                    <>
                        {i === 0 && <Breadcrumb.Item key={'-1'}> </Breadcrumb.Item>}
                        <Breadcrumb.Item key={i}>{module}</Breadcrumb.Item>
                    </>
                );
            })}
        </Breadcrumb>
    );
};
