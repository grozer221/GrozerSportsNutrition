import React, {FC, useState} from 'react';
import {Layout, Menu, Tag} from 'antd';
import {
    AppstoreAddOutlined,
    FileOutlined,
    FunnelPlotOutlined,
    LineChartOutlined,
    LogoutOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import s from './MyMenu.module.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {s_getAuthData} from '../../../redux/auth-selectors';
import {logout} from '../../../redux/auth-reducer';

const {Sider} = Layout;
const {SubMenu} = Menu;


export const MyMenu: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const authData = useSelector(s_getAuthData);
    const dispatch = useDispatch();

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className={s.wrapperMenu}>
            <div className={s.logo}/>
            <div className={s.userInfo}>
                <div className={s.userFirstLastName}>
                    <span className={s.name}>{authData?.user.firstName}</span>
                    <span className={s.name}>{authData?.user.lastName}</span>
                </div>
                <div className={s.roles}>
                    {authData?.user.roles.map(role => (
                        <Tag key={role.id} color={role.color}>{role.name}</Tag>
                    ))}
                </div>
            </div>
            <Menu theme="dark" /*defaultSelectedKeys={['1']}*/ mode="inline">
                <Menu.Item key="10" icon={<LineChartOutlined/>}>
                    <Link to={'/admin'}>Home</Link>
                </Menu.Item>
                <Menu.Item key="20" icon={<ShoppingCartOutlined/>}>
                    <Link to={'/admin/orders'}>Orders</Link>
                </Menu.Item>
                <Menu.Item key="30" icon={<ShoppingOutlined/>}>
                    <Link to={'/admin/products'}>
                        Products
                    </Link>
                </Menu.Item>
                <Menu.Item key="40" icon={<FunnelPlotOutlined/>}>
                    <Link to={'/admin/categories'}>
                        Categories
                    </Link>
                </Menu.Item>
                <Menu.Item key="80" icon={<FileOutlined/>}>
                    <Link to={'/admin/files'}>Files</Link>
                </Menu.Item>
                <Menu.Item key="90" icon={<TeamOutlined/>}>
                    <Link to={'/admin/users'}>
                        Users
                    </Link>
                </Menu.Item>
                <Menu.Item key="110" icon={<AppstoreAddOutlined/>}>
                    <Link to={'/admin/pages'}>
                        Pages
                    </Link>
                </Menu.Item>
                {/*<Menu.Item key="120" icon={<SettingOutlined/>}>*/}
                {/*    <Link to={'/admin/settings'}>*/}
                {/*        Settings*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="130" icon={<UserOutlined/>}>
                    <Link to={'/'}>Customer side</Link>
                </Menu.Item>
                <Menu.Item key="140" icon={<LogoutOutlined/>} onClick={() => dispatch(logout())}>
                    Logout
                </Menu.Item>
                <div style={{height: '48px'}}/>
            </Menu>
        </Sider>
    );
};
