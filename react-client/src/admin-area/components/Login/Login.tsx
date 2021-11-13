import React, {FC} from "react";
import s from './Login.module.css';
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

export const Login: FC = () => {
    const onFinish = (values: { email: string, password: string }) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className={s.loginForm}
            initialValues={{remember: true}}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[{required: true, message: 'Please input your Email!'}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email" type={'email'}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle className={s.rememberMe}>
                    <Checkbox>
                        <span className={s.white}>Remember me</span>
                    </Checkbox>
                </Form.Item>

                <Link className={s.forgotPass} to={''}>
                    Forgot password
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={['login-form-button', s.submit].join(' ')}>
                    Log in
                </Button>
                <span className={s.white}>Or </span>
                <Link to={'/admin-area/register'}>register now!</Link>
            </Form.Item>
        </Form>
    );
}
