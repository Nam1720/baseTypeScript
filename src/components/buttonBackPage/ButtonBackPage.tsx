import { Button } from 'antd';
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './buttonBackPage.scss';
const ButtonBackPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Link> */}
      <Button onClick={() => navigate(-1)} className="border-none-imp btn-backpage">
        <LeftOutlined className="icon-back" /> <span className="text-semibold">Quay lại</span>
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default ButtonBackPage;
