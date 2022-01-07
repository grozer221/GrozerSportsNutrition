import React, {FC} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import s from './AuthLogin.module.css';
import {s_getIsAuth} from '../../../redux/auth-selectors';
import {LOGIN_MUTATION, LoginData, LoginVars} from '../../../common-area/gql/auth-mutation';
import {login} from '../../../redux/auth-reducer';

type FormValues = {
    email: string,
    password: string,
    remember: boolean,
    rememberAndForgotPass: any
}

export const AuthLogin: FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(s_getIsAuth);
    const [loginMutation, loginMutationOptions] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION);
    const [form] = Form.useForm();

    const onFinish = async ({email, password, remember}: FormValues) => {
        loginMutation({variables: {loginInput: {email, password}}})
            .then(response => {
                if (response.data) {
                    dispatch(login(response.data.login));
                }
            })
            .catch(error => {
                form.setFields([
                    {
                        name: 'rememberAndForgotPass',
                        errors: [error.message],
                    },
                ]);
            });
    };

    const resetErrors = () => {
        form.resetFields(['rememberAndForgotPass']);
    };

    if (isAuth)
        return <Navigate to={'/'}/>;

    return (
        <div className={s.loginForm}>
            <Form
                name="loginForm"
                initialValues={{remember: true}}
                onFinish={onFinish}
                form={form}
            >
                <h2 className={s.title}>
                    <div>Grozer Sports Nutrition</div>
                    <div className="badge">Login</div>
                </h2>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your Email!'}]}
                >
                    <Input onInput={resetErrors} prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Email" type={'email'}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        onInput={resetErrors}
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item name="rememberAndForgotPass">
                    <Form.Item name="remember" valuePropName="checked" noStyle className={s.rememberMe}>
                        <Checkbox onClick={resetErrors}>
                            <span className={s.white}>Remember me</span>
                        </Checkbox>
                    </Form.Item>

                    <Link className={s.forgotPass} to={''}>
                        Forgot password
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Button loading={loginMutationOptions.loading} type="primary" htmlType="submit"
                            className={['login-form-button', s.submit].join(' ')}>
                        Log in
                    </Button>
                    <span className={s.white}>Or </span>
                    <Link to={'../register'}>register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
