import React, {FC} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {s_getIsAuth} from '../../../redux/auth-selectors';
import {useMutation} from '@apollo/client';
import {LOGIN_MUTATION, LoginData, LoginVars} from '../../../common-area/gql/auth-mutation';
import {login} from '../../../redux/auth-reducer';
import s from './AuthLogin.module.css';
import {gqlLinks} from '../../../common-area/gql/client';

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
        loginMutation({variables: {loginInput: {email, password}}, context: {gqlLink: gqlLinks.admin}})
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
        return <Navigate to={'/admin'}/>;

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
                    <div className="badge">Admin</div>
                </h2>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!'
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        ]}
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
                </Form.Item>
            </Form>
        </div>
    );
};
