import React, {FC} from "react";
import {Layout} from "antd";

const {Header} = Layout;

export const AppHeader: FC = () => {
    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            Header
        </Header>
    );
}
