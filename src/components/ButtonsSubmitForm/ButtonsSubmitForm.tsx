import { Button, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './buttonsSubmitForm.scss';

export interface ButtonsSubmitFormProps {
  form: FormInstance;
}
const ButtonsSubmitForm: React.FC<ButtonsSubmitFormProps> = ({ form }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="position-fix action-form">
        <Space size="middle">
          <div className="display-flex justify-content-end border-none" style={{ width: '200px' }}>
            <Button className="width-50 btn btn-cancel" onClick={() => navigate(-1)} style={{ marginRight: '10px' }}>
              Hủy
            </Button>
            <Button htmlType="submit" onClick={() => form.submit()} className="width-50 btn-blue btn" type="primary">
              Lưu
            </Button>
          </div>
        </Space>
      </div>
    </>
  );
};

export default ButtonsSubmitForm;
