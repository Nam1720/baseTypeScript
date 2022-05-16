import React from 'react';
import { Layout } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PermissionRoute from 'middleware/PermissionRoute';
import './styles/_sidebar.scss';
import logo from 'assets/images/logo.png';
import { collapseSidebar } from 'store/common/commonSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hookStore';

const Sidebar = () => {
  const collapse = useAppSelector((state: any) => state.common.isCloseSidebar);
  const dispatch = useAppDispatch();

  const toggleLayout = (): void => {
    dispatch(collapseSidebar());
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      style={{ position: 'sticky', zIndex: '999', height: '100vh' }}
      className="position-rel top-0"
    >
      <div className="display-flex justify-content-center logo">
        <img src={logo} alt="logo" />
        <div className="collapse-sidebar">
          <button
            className="toggleLayout border-none full-width position-abs cursor-pointer btn-toggle"
            onClick={toggleLayout}
          >
            {collapse ? (
              <RightOutlined className="font-size-20 primary-color" />
            ) : (
              <LeftOutlined className="font-size-20 primary-color" />
            )}
          </button>
        </div>
      </div>
      <PermissionRoute />
      {/* <Menu className="sidebar-full-height" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
        {renderMenus()}
      </Menu> */}
      {/* <PermissionRoute navConfig={navigation} theme="dark" mode="inline" />
      <i
        onClick={toggleSidebar}
        className={collapse ? 'icon-arrow-left icon-nav icon-nav__close' : 'icon-arrow-left icon-nav icon-nav__open'}
      ></i> */}
    </Layout.Sider>
  );
};

export default React.memo(Sidebar);
