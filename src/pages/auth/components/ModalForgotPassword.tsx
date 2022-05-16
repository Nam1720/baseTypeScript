import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import '../styles/register.scss';
import ModalSuccessPassword from './ModalSuccessPassword';

// import PropTypes from 'prop-types';

// ModalForgotPassword.propTypes = {
// };
export interface ModalProps {
  isForgot: boolean;
  closeModalForgot: () => void;
}
const ModalForgotPassword: React.FC<ModalProps> = ({ isForgot, closeModalForgot }) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowSuccess, setShowSuccess] = useState(false);
  const showSuccess = () => {
    setShowSuccess(true);
  };
  const closeModalSuccess = () => {
    setShowSuccess(false);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (values) {
      showSuccess();
      closeModalForgot();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div>
        <Modal className="no-footer no-header modal-notify" visible={isForgot} onCancel={closeModalForgot}>
          <div className="p-lr-30 p-b-1-5">
            <div className="logo-forgot text-center">
              <figure>
                <img src="../../../assets/images/logo-forgot.png" alt="" />
              </figure>
            </div>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              scrollToFirstError
            >
              <h3 className="font-sourcesans__bold font-size-20 m-b-10">Quên mật khẩu</h3>
              <Form.Item
                name="email"
                className="m-b-10"
                rules={[
                  {
                    type: 'email',
                    message: 'Vui lòng nhập đúng định dạng email!',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ]}
              >
                <Input name="email" placeholder="Nhập email" className="border-rd-8 h-50" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }} className="text-right">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-bg color-white btn-sendmail full-width text-uppercase font-size-16 text-center cursor-pointer"
                >
                  <span className="font-sourcesans__bold">Lấy lại mật khẩu</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <ModalSuccessPassword isShowSuccess={isShowSuccess} closeModalSuccess={closeModalSuccess} />
      </div>
    </>
  );
};

export default ModalForgotPassword;
