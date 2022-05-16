import { Avatar, Col, Dropdown, Menu, Row, Space, Typography } from 'antd';
// import { useAppDispatch } from 'hooks/hookStore';
import { useEffect } from 'react';
// import { changeLanguage } from 'i18next';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { history } from 'utils/history';
// import { useHistory } from 'react-router-dom';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { changeLanguageInput, collapseSidebar } from 'store/common/commonSlice';
// import { changeLanguageInput } from 'store/common/commonSlice';
import { destroyLogged, saveAuth } from 'utils/jwt';
import './styles/_header.scss';

// const { Option } = Select;

const Header = () => {
  // const { i18n } = useTranslation();
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // const collapsed = useSelector((state: any) => state.common.isCloseSidebar);

  // const toggleLayout: void = () => {
  //   dispatch(collapseSidebar());
  // };
  // useEffect(() => {
  //   console.log('Location change', params, location);
  // }, [location]);

  // const onChangeLang = (key: string): void => {
  //   switch (key) {
  //     case 'vi':
  //       i18n.changeLanguage(key);
  //       dispatch(changeLanguageInput('vi'));
  //       break;
  //     case 'en':
  //       i18n.changeLanguage(key);
  //       dispatch(changeLanguageInput('en'));
  //       break;
  //   }
  // };

  const menuProfile: JSX.Element = (
    <Menu onClick={() => logout()}>
      <Menu.Item>Đăng xuất</Menu.Item>
    </Menu>
  );
  const logout = async () => {
    await destroyLogged();
    saveAuth(null);
    // console.log(getAccessToken(), 'TOKEN');
    // history.push('/login');
    navigate('/login');
  };

  return (
    <>
      <header
        style={{ position: 'sticky', zIndex: '998' }}
        className="header d-flex justify-content-between bg-color-light top-0"
      >
        <Row>
          <Col span={12}>
            <Typography.Title level={3} className="margin-0">
              {location.pathname === '/order' ? 'Danh sách đơn hàng' : ''}
            </Typography.Title>
            {/* <a href="javscript:;" className="header__toggle" onClick={toggleLayout}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </a> */}
          </Col>
          <Col span={12} className="text-right">
            <Space>
              {/* <div>
                <i className="icon icon-earth" />

                <Select
                  defaultValue="vi"
                  className="language__select antd-select-custom"
                  style={{ width: 100 }}
                  onChange={onChangeLang}
                >
                  <Option value="vi">Tiếng Việt</Option>
                  <Option value="en">English</Option>
                </Select>
              </div> */}
              <Dropdown overlay={menuProfile} placement="topRight" arrow>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<i className="icon icon-bell2" />} />
              </Dropdown>
            </Space>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default Header;
