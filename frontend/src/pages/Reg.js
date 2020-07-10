import React, { useContext } from 'react'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useReactRouter from 'use-react-router'
import { Form, Input, Button } from 'antd'
import { AuthContext } from '../context/auth/AuthContext'
import styled from 'styled-components'
import { Container } from '../styled/Container'

const StyledReg = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 50px;
    > div {
        width: 100%;
        max-width: 400px;
        padding: 50px;
        border-radius: 1rem;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
        > div {
            padding-bottom: 3rem;
        }
        h3, p {
            text-align: center;
        }
        p {
            opacity: 0.8;
        }
    }
    .ant-btn {
        width: 100%;
    }
`;

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некорректный E-mail')
        .required('Введите E-mail'),
    firstName: Yup.string()
        .min(3, 'Слишком короткое имя')
        .required('Введите имя'),
    userName: Yup.string()
        .min(3, 'Слишком короткий логин')
        .required('Введите имя'),
    password: Yup.string()
        .matches(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            'Слишком легкий пароль'
        )
        .required('Введите пароль'),
    confirmPassword: Yup.string()
        .required('Введите пароль')
        .oneOf([Yup.ref("password"), null], 'Пароли должны совпадать')
})

const errorMessege = (touched, messege) => {
    if (!touched) {
        return
    }
    if (messege) {
        return messege
    }
}

export const Reg = () => {

    const { history } = useReactRouter()
    const { authRegister } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            authRegister(values.email, values.firstName, values.userName, values.password)
            setSubmitting(true)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
                history.push('/')
            }, 500)
        }
    });

    const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } = formik

    return (
        <Container>
            <StyledReg>
                <div>
                    <div className="reg__top">
                        <h3>Зарегистрироваться</h3>
                        <p>Пожалуйста заполните данные</p>
                    </div>
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            name="email"
                            hasFeedback
                            help={errorMessege(touched.email, errors.email)}
                            validateStatus={!touched.email ? null : errors.email ? "error" : "success"}
                        >
                            <Input
                                id="reg__email"
                                name="email"
                                placeholder="E-mail"
                                prefix={<MailOutlined />}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // autoFocus={true}
                            />
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            hasFeedback
                            help={errorMessege(touched.firstName, errors.firstName)}
                            validateStatus={!touched.firstName ? null : errors.firstName ? "error" : "success"}
                        >
                            <Input
                                id="reg__firstName"
                                name="firstName"
                                placeholder="Имя"
                                prefix={<UserOutlined />}
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="userName"
                            hasFeedback
                            help={errorMessege(touched.userName, errors.userName)}
                            validateStatus={!touched.userName ? null : errors.userName ? "error" : "success"}
                        >
                            <Input
                                id="reg__userName"
                                name="userName"
                                placeholder="Логин"
                                prefix={<UserOutlined />}
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            hasFeedback
                            help={errorMessege(touched.password, errors.password)}
                            validateStatus={!touched.password ? null : errors.password ? "error" : "success"}
                        >
                            <Input.Password
                                id="reg__password"
                                name="password"
                                placeholder="Пароль"
                                prefix={<LockOutlined />}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            hasFeedback
                            help={errorMessege(touched.confirmPassword, errors.confirmPassword)}
                            validateStatus={!touched.confirmPassword ? null : errors.confirmPassword ? "error" : "success"}
                        >
                            <Input.Password
                                id="reg__confirmPassword"
                                name="confirmPassword"
                                placeholder="Повторите пароль"
                                prefix={<LockOutlined />}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                                Зарегистрироваться
                        </Button>
                        </Form.Item>
                    </Form>
                    <Link to='/log'><p>Войти</p></Link>
                </div>
            </StyledReg>
        </Container>
    )
}