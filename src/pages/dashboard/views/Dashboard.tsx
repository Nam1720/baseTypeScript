import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space, Typography } from 'antd';

const Dashboard: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Space className="dashboard full-width" direction="vertical" size={15}>
      <div className="dashboard__wrap">
        <Typography.Title level={3}>Dashboard</Typography.Title>
        <br />
        {t('common.create')}
      </div>
    </Space>
  );
};

export default Dashboard;
