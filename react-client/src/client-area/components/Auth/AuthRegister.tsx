import React, {FC} from 'react';
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import s from './AuthRegister.module.css';
import {s_getIsAuth} from '../../../redux/auth-selectors';
import {REGISTER_MUTATION, RegisterData, RegisterVars} from '../../../common-area/gql/auth-mutation';
import {login} from '../../../redux/auth-reducer';

type FormValues = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export const AuthRegister: FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(s_getIsAuth);
    const navigate = useNavigate();
    const [registerMutation, registerMutationOptions] = useMutation<RegisterData, RegisterVars>(REGISTER_MUTATION);
    const [form] = Form.useForm();

    const onFinish = async (values: FormValues) => {
        registerMutation({variables: {registerInput: {...values}}})
            .then(response => {
                if (response.data) {
                    message.success(response.data.register);
                    navigate('/');
                }
            })
            .catch(error => {
                form.setFields([
                    {
                        name: 'email',
                        errors: [error.message],
                    },
                ]);
            });
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
                    <div className="badge">Register</div>
                </h2>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your Email!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Email" type={'email'}/>
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
                <Form.Item
                    name="firstName"
                    rules={[{required: true, message: 'Please input your FirstName!'}]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="FirstName"
                    />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[{required: true, message: 'Please input your LastName!'}]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="LastName"
                    />
                </Form.Item>
                <Form.Item>
                    <Button loading={registerMutationOptions.loading} type="primary" htmlType="submit"
                            className={s.submit}>
                        Register
                    </Button>
                    <span className={s.white}>Or </span>
                    <Link to={'../login'}>login now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
