import React, {FC} from "react";
import {Breadcrumb} from "antd";

export const AppBreadcrumb: FC = () => {
    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
    );
}
