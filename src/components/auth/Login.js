import React, { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/auth/authContext';

const Login = () => {
  useEffect(() => {
    localStorage.removeItem('formData');
  }, []);

  const { login } = useContext(AuthContext);

  const onFinish = (values) => {
    const { email, password } = values;

    localStorage.setItem('formData', JSON.stringify(values));

    login(email, password);
  };

  return (
    <div className='wrapper-form'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={JSON.parse(localStorage.getItem('formData'))}
        onFinish={onFinish}
      >
        <h2>Login</h2>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
