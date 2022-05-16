import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import '../styles/register.scss';

// import PropTypes from 'prop-types';

// ModalForgotPassword.propTypes = {
// };
export interface ModalProps {
  isShowSuccess: boolean;
  closeModalSuccess: () => void;
}
const ModalForgotPassword: React.FC<ModalProps> = ({ isShowSuccess, closeModalSuccess }) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const goToLogin = () => {
    closeModalSuccess();
  };

  return (
    <>
      <Modal className="no-footer no-header modal-notify" visible={isShowSuccess} onCancel={closeModalSuccess}>
        <div className="p-lr-30">
          <div className="logo-register">
            <figure>
              <img src="../../../assets/images/logo-register.png" alt="" />
            </figure>
          </div>
          <div className="logo-checked text-center">
            <figure>
              <img src="../../../assets/images/checked.png" alt="" />
            </figure>
          </div>
          <div className="message text-left">
            <p className="font-sourcesans__bold font-size-20">
              Yêu cầu lấy lại mật khẩu thành công. Xin vui lòng kiểm tra hòm thư của bạn để tiến hành lấy lại mật khẩu!
            </p>
          </div>
          <div
            onClick={goToLogin}
            className="primary-color-txt font-size-16 font-sourcesans__bold text-center cursor-pointer"
          >
            Đăng nhập tài khoản
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalForgotPassword;
