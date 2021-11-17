import React, {FC, useState} from "react";
import {Layout, Menu} from "antd";
import {
    AppstoreOutlined,
    FileOutlined,
    HomeOutlined,
    SettingOutlined,
    ShoppingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import s from './AppMenu.module.css';
import {Link} from "react-router-dom";

const {Sider} = Layout;
const {SubMenu} = Menu;


export const AppMenu: FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className={s.logo}/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined/>}>
                    <Link to={'/admin'}>Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShoppingOutlined/>}>
                    <Link to={'/admin/products'}>Products</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<AppstoreOutlined/>}>
                    <Link to={'/admin/categories'}>Categories</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<TeamOutlined/>} title="Users">
                    <Menu.Item key="4">
                        <Link to={'/admin/users'}>
                            Customers
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={'/admin/users'}>
                            Employees
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="6" icon={<SettingOutlined/>}>
                    Settings
                </Menu.Item>
                <Menu.Item key="7" icon={<UserOutlined/>}>
                    <Link to={'/'}>Client site</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
