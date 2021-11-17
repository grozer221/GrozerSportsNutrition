import React, {FC} from "react";
import {Dropdown, Layout, Menu} from "antd";
import s from './AppHeader.module.css';
import {useDispatch, useSelector} from "react-redux";
import {s_getAuthData} from "../../../redux/auth-selectors";
import {Auth} from "../../../types/types";
import {Link} from "react-router-dom";
import {logout} from "../../../redux/auth-reducer";
import {DownOutlined} from "@ant-design/icons";

const {Header} = Layout;

export const AppHeader: FC = () => {
    const authData = useSelector(s_getAuthData) as Auth;
    const dispatch = useDispatch();

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to={''}>
                    1st menu item
                </Link>
            </Menu.Item>
            <Menu.Item onClick={() => dispatch(logout())}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className={s.wrapperHeader}>
            <div></div>
            <Dropdown overlay={menu} placement="topRight">
                <div>
                    <span>{authData.user.firstName} {authData.user.lastName}</span>
                    <DownOutlined/>
                </div>
            </Dropdown>
        </Header>
    );
}
