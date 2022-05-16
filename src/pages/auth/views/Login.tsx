import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { Form, Checkbox, Input, Button , notification, Image } from 'antd';
import { isLogin } from 'utils/jwt';
import { login } from './../api/index';
import { LoginReq } from './../model/LoginModel';
import '../styles/login.scss';
const imgLogo = require('assets/images/logo.png');

const Login: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authLogged = isLogin();

  useEffect(() => {
    if (authLogged) {
      navigate('/');
    }
  }, []);

  const onSubmitForm = async (values: LoginReq) => {
    setLoading(true);
    const logged = await login(values);
    if (!logged) {
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate('/dashboard');
  };
  return (
    <div className="login full-screen display-flex-center justify-content-center position-rel">
      <div className="login__wrap">
        <div className="text-center login__logo">
          <figure className="margin-0 p-0">
            <img src={imgLogo} alt="Logo" />
          </figure>
        </div>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="normal_login"
          className="login-form"
          onFinish={onSubmitForm}
        >
          <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nhập email"
              className="user"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              className="password"
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button primary-bg font-size-16 text-uppercase"
              loading={loading}
            >
              <span className="font-size-16">Đăng nhập</span>
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="display-flex-center justify-content-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              {/* <a
                href="javascript:;"
                className="primary-color-txt font-size-16"
                onClick={showModal}
              >
                Đăng ký tài khoản
              </a> */}

              <Button className="login-form-forgot primary-color-txt font-size-16">Quên mật khẩu</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {/* <ModalForgotPassword isForgot={isForgot} closeModalForgot={closeModalForgot} /> */}
    </div>
  );
};

export default Login;
