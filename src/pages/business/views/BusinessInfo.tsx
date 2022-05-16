import React from 'react';
import { Space, Typography } from 'antd';

const BusinessInfo = () => {
  return (
    <div className="business-info">
      <Space className="full-width" direction="vertical" size={15}>
        <Typography.Title level={3}>Thông tin doanh nghiệp</Typography.Title>
      </Space>
    </div>
  );
};

export default BusinessInfo;
