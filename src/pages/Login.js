import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons'; // Import icons
import api from '../api';
import Layout from '../components/layout';

const { Title, Paragraph } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (values) => {
        setLoading(true);
        setError('');

        const { email, password } = values;

        try {
            const response = await api.post('/users/login', { email, password });
            const { token, username } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            message.success('Login successful!');
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid email or password. Please try again.';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = () => {
        setError('');
    };

    return (
        <Layout>
            <div className="login-page-container" style={styles.pageContainer}>
                {/* Sidebar */}
                <div className="login-sidebar" style={styles.sidebar}>
                    <Title level={2} style={styles.title}>Welcome to MediMate</Title>
                    <Paragraph style={styles.sidebarText}>
                        MediMate is your one-stop solution for managing and tracking medicines. Whether you're a patient, doctor, or pharmacist, MediMate helps you:
                    </Paragraph>
                    <ul style={styles.sidebarList}>
                        <li style={styles.sidebarListItem}>
                            <CheckCircleOutlined style={styles.sidebarListItemIcon} /> Monitor prescription histories and dosage schedules.
                        </li>
                        <li style={styles.sidebarListItem}>
                            <CheckCircleOutlined style={styles.sidebarListItemIcon} /> Set reminders for medication intake.
                        </li>
                        <li style={styles.sidebarListItem}>
                            <CheckCircleOutlined style={styles.sidebarListItemIcon} /> Access personalized health records.
                        </li>
                    </ul>
                    <Paragraph style={styles.sidebarText}>
                        Join a community that ensures better health outcomes with simplified medicine tracking. Login to your account or create a new one to get started!
                    </Paragraph>
                </div>

                {/* Login Form */}
                <div className="register-page" style={styles.formContainer}>
                    <div style={styles.formBox}>
                        <Paragraph style={styles.formTitle}>Login</Paragraph>
                        <Spin spinning={loading}>
                            <Form
                                form={form}
                                name="login"
                                onFinish={handleLogin}
                                onFieldsChange={handleFormChange}
                                autoComplete="off"
                                style={{ width: '100%' }}
                            >
                                {/* Email Input Field */}
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { type: 'email', message: 'The input is not a valid E-mail!' },
                                        { required: true, message: 'Please input your E-mail!' },
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                        size="large"
                                        placeholder="Enter your email"
                                        prefix={<MailOutlined style={styles.icon} />}
                                        style={styles.input}
                                    />
                                </Form.Item>

                                {/* Password Input Field */}
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Enter your password"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        prefix={<LockOutlined style={styles.icon} />}
                                        style={styles.input}
                                    />
                                </Form.Item>

                                {/* Error Message */}
                                {error && <p style={styles.errorMessage}>{error}</p>}

                                {/* Login Button */}
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        block
                                        size="large"
                                        style={styles.loginButton}
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    
                                        Don't have an account? <Link to="/register" style={styles.registerLink}>Register now!
                                    </Link>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const styles = {
    // Styles as defined above
    title: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '75px',
    },
    pageContainer: {
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        flex: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #42a5f5 20%, #0077ff 100%)',
        color: '#fff',
    },
    sidebarText: {
        color: '#f0f2f5',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: 0,
        color: '#fff',
        fontSize: '16px',
    },
    formContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formBox: {
        backgroundColor: '#fff',
        padding: '40px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '2rem',
        paddingBottom: '20px',
        color: '#1890ff',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
    },
    loginButton: {
        borderRadius: '5px',
        fontWeight: 'bold',
    },
    registerLink: {
        color: '#1890ff',
        fontWeight: 'bold',
    },
};

export default Login;
