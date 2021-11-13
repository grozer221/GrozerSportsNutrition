import React, {FC} from "react";
import {Breadcrumb} from "antd";
import {useLocation, useParams} from "react-router-dom";

export const AppBreadcrumb: FC = () => {
    const a = useLocation();
    console.log(a);
    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
    );
}
