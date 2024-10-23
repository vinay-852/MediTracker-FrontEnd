import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button, message, Spin, Typography, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Layout from '../components/layout';
import api from '../api';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const Register = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const [error, setError] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleRegister = async (values) => {
        setLoading(true);
        setError('');
        const { username, email, password, phone, gender } = values;

        try {
            await api.post('/users/register', { username, email, password, phone, gender });
            message.success('Registration successful!');
            navigate('/login');
        } catch (err) {
            setError('Registration failed');
            message.error('Registration failed. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (e) => {
        setIsAgreementChecked(e.target.checked);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout>
            <div className="register-page-container" style={styles.pageContainer}>
                {/* Sidebar */}
                <div className="register-sidebar" style={styles.sidebar}>
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
                        Join a community that ensures better health outcomes with simplified medicine tracking. Register your account to get started!
                    </Paragraph>
                </div>

                {/* Register Form */}
                <div className="register-form-container" style={styles.formContainer}>
                    <div style={styles.formBox}>
                        <Paragraph style={styles.formTitle}>Register</Paragraph>
                        <Spin spinning={loading}>
                            <Form
                                form={form}
                                name="register"
                                onFinish={handleRegister}
                                autoComplete="off"
                                style={{ width: '100%' }}
                            >
                                {/* Username Input Field */}
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input size="large" placeholder="Enter your username" style={styles.input} />
                                </Form.Item>

                                {/* Email Input Field */}
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { type: 'email', message: 'The input is not a valid E-mail!' },
                                        { required: true, message: 'Please input your E-mail!' },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Enter your email"
                                        prefix={<MailOutlined style={styles.icon} />}
                                        style={styles.input}
                                    />
                                </Form.Item>

                                {/* Phone Number Input Field */}
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input size="large" placeholder="Enter your phone number" style={styles.input} />
                                </Form.Item>

                                {/* Gender Selection */}
                                <Form.Item
                                    name="gender"
                                    rules={[{ required: true, message: 'Please select your gender!' }]}
                                >
                                    <Select placeholder="Select your gender" size="large" style={styles.input}>
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>

                                {/* Password Input Field */}
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please input your password!' },
                                        { min: 6, message: 'Password must be at least 6 characters long!' },
                                        {
                                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                            message: 'Password must include letters, numbers, and special characters!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Enter your password"
                                        prefix={<LockOutlined style={styles.icon} />}
                                        style={styles.input}
                                    />
                                </Form.Item>

                                {/* Agreement Checkbox */}
                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject(new Error('You must accept the agreement')),
                                        },
                                    ]}
                                >
                                    <Button type="link" onClick={showModal}>
                                    <Checkbox checked={isAgreementChecked} onChange={handleCheckboxChange}>
                                        I have read the agreement
                                    </Checkbox></Button>
                                </Form.Item>

                                {/* Error Message */}
                                {error && <p style={styles.errorMessage}>{error}</p>}

                                {/* Register Button */}
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        block
                                        size="large"
                                        disabled={!isAgreementChecked}
                                        style={styles.loginButton}
                                    >
                                        Register
                                    </Button>
                                </Form.Item>

                                {/* Login Link */}
                                <Form.Item>
                                    Already have an account? <Link to="/login" style={styles.registerLink}>Login now!</Link>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>

            {/* Modal for Agreement Details */}
            <Modal
                title="User Agreement"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="I Understand"
                cancelText="Cancel"
            >
                <Paragraph>
                    By registering, you agree to the following terms and conditions:
                </Paragraph>
                <ul>
                    <li>All information provided is accurate and truthful.</li>
                    <li>Your data will be kept confidential and secure.</li>
                    <li>You agree to receive notifications related to your medication and health.</li>
                    <li>Terms and conditions may change, and you will be notified.</li>
                </ul>
            </Modal>
        </Layout>
    );
};

const styles = {
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
        borderRadius: '8px',
        width: '400px',
    },
    formTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    input: {
        borderRadius: '8px',
    },
    icon: {
        color: '#1890ff',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '20px',
        textAlign: 'center',
    },
    loginButton: {
        borderRadius: '8px',
        
    },
    registerLink: {
        color: '#1890ff',
        fontWeight: 'bold',
    },
    sidebarListItem: {
        marginBottom: '10px',
        fontSize: '16px',
        color: '#fff',
    },
    sidebarListItemIcon: {
        marginRight: '10px',
        fontSize: '20px',
    },
};

export default Register;
