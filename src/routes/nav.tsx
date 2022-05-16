import { AppstoreOutlined, UserOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';

export default {
  items: [
    { id: 1, name: 'Dashboard', url: '/dashboard', icon: <AppstoreOutlined /> },
    {
      id: 2,
      name: 'Quản lý doanh nghiệp',
      icon: <UserOutlined />,
      children: [
        {
          id: 21,
          name: 'Đơn đăng ký hợp tác',
          url: 'business/business-coopera',
          icon: <AppstoreOutlined />,
        },
        {
          id: 22,
          name: 'Thông tin doanh nghiệp',
          url: 'business/business-info',
          icon: <AppstoreOutlined />,
        },
        {
          id: 23,
          name: 'Quản lý các doanh nghiệp',
          url: 'business/business-manager',
          icon: <AppstoreOutlined />,
        },
        {
          id: 24,
          name: 'Hỗ trợ',
          url: 'business/business-support',
          icon: <AppstoreOutlined />,
        },
      ],
    },
    { id: 3, name: 'Quản lý người dùng', url: '/dashboard', icon: <ProfileOutlined /> },
    { id: 4, name: 'Quản lý phân quyền', url: '/dashboard', icon: <SettingOutlined /> },
    { id: 90, name: 'Quản lý khách hàng', url: '/dashboard', icon: <SettingOutlined /> },
  ],
};
