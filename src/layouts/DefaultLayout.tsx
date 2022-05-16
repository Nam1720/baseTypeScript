import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { isLogin } from 'utils/jwt';
import BreadCrumbCustom from 'components/breadcrumbCustom/BreadCrumbCustom';
const Header = React.lazy(() => import('./Header'));
const Sidebar = React.lazy(() => import('./Sidebar'));
const PermissionContent = React.lazy(() => import('middleware/PermissionContent'));

const { Content } = Layout;

const loading = () => (
  // <div className="animated fadeIn text-center">Loading 1...</div>
  <Spin />
);

// const Page404 = Loadable({
//   loader: () => import('modules/Commons/_views/Page404'),
//   loading
// });

const DefaultLayout = () => {
  const navigate = useNavigate();
  const authLogged = isLogin();

  useEffect((): void => {
    if (!authLogged) {
      navigate('/login');
    }
  }, []);
  if (!authLogged) {
    return <></>;
  }

  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <Suspense fallback={loading()}>
        <Sidebar />
      </Suspense>
      <Layout className="main-layout">
        <Suspense fallback={loading()}>
          <Header />
        </Suspense>
        <Content style={{ overflow: 'initial' }}>
          <div className="bg-main position-rel">
            <div style={{ padding: '20px 0' }}>
              <BreadCrumbCustom />
            </div>
            <Suspense fallback={loading()}>
              <PermissionContent />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
