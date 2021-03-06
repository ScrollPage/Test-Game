import React, { useContext } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useReactRouter from 'use-react-router'
import { Form, Input, Button } from 'antd'
import { AuthContext } from '../context/auth/AuthContext'
import styled from 'styled-components'
import { Container } from '../styled/Container'

const StyledLog = styled.div`
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
    userName: Yup.string()
        // .email('Некорректный E-mail')
        .required('Введите логин'),
    password: Yup.string()
        .matches(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            'Слишком легкий пароль'
        )
        .required('Введите пароль')
})

const errorMessege = (touched, messege) => {
    if (!touched) {
        return
    }
    if (messege) {
        return messege
    }
}

export const Log = () => {

    const { history } = useReactRouter()
    const { authLogin } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            authLogin(values.userName, values.password)
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
            <StyledLog>
                <div>
                    <div>
                        <h3>Войти в аккаунт</h3>
                        <p>Пожалуйста войдите в свой аккаунт</p>
                    </div>
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            name="userName"
                            hasFeedback
                            help={errorMessege(touched.userName, errors.userName)}
                            validateStatus={!touched.userName ? null : errors.userName ? "error" : "success"}
                        >
                            <Input
                                id="log__userName"
                                name="userName"
                                size="large"
                                placeholder="Логин"
                                prefix={<UserOutlined />}
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // autoFocus={true}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            hasFeedback
                            help={errorMessege(touched.password, errors.password)}
                            validateStatus={!touched.password ? null : errors.password ? "error" : "success"}
                        >
                            <Input.Password
                                id="log__password"
                                name="password"
                                size="large"
                                placeholder="Пароль"
                                prefix={<LockOutlined />}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting}>
                                Войти в аккаунт
                        </Button>
                        </Form.Item>
                    </Form>
                    <Link to='/reg'><p>Зарегистрироваться</p></Link>
                </div>
            </StyledLog>
        </Container>
    )
}