import React from 'react';
import { Space, Typography } from 'antd';

const BusinessManager = () => {
  return (
    <div className="business-manager">
      <Space className="full-width" direction="vertical" size={15}>
        <Typography.Title level={3}>Quản lý các doanh nghiệp</Typography.Title>
      </Space>
    </div>
  );
};

export default BusinessManager;
