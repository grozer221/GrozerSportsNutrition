import React, {FC} from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {s_getIsAuth} from '../../../redux/auth-selectors';
import {useMutation} from '@apollo/client';
import {LOGIN_MUTATION, LoginData, LoginVars} from '../../GraphQL/auth-mutation';
import {actions} from '../../../redux/auth-reducer';
import s from './Login.module.css';

export const Login: FC = () => {
    console.log('admin login form');
    const dispatch = useDispatch();
    const isAuth = useSelector(s_getIsAuth);
    const [login, loginOptions] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION);

    if (isAuth)
        return <Navigate to={'/admin'}/>;

    const onFinish = async (values: { email: string, password: string, remember: boolean }) => {
        console.log('Received values of form: ', values);
        const response = await login({variables: {loginInput: {email: values.email, password: values.password}}});
        console.log(response);
        if (response.data && !response.errors) {
            localStorage.setItem('token', response.data.login.accessToken);
            dispatch(actions.setAuthData(response.data.login, true));
        } else {
            response.errors?.forEach(error => message.error(error.message));
        }
    };

    return (
        <div className={s.loginForm}>
            <Form
                name="normal_login"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <h2 className={s.title}>Admin Panel</h2>
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
                    <Link to={'/admin/register'}>register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
