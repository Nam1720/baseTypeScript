import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import navigation from 'routes/nav';
// import useRouter from 'hooks/useRouter';
// import { isEmpty } from 'utils/helpers';
// import {getAuth } from 'utils/jwt'
import { NavItem } from './../layouts/models/NavModel';

const rootSubmenuKeys: string[] = [];

const PermissionRoute = () => {
  const navigate = useNavigate();

  // if (!isEmpty(userRoles)) {
  // } else {
  //   return false;
  // }

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChangeMenu = (keys: string[]) => {
    const latestOpenKey: string | undefined = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (!latestOpenKey || rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderMenus = () => {
    if (!navigation) {
      return null;
    }
    return navigation.items.map((nav: NavItem) => {
      if (!nav.children) {
        return renderMenuItem(nav);
      }
      return renderSubMenuItem(nav);
    });
  };
  const directRoute = (url: string) => {
    navigate(url);
  };

  function renderMenuItem(item: NavItem) {
    if (!item.children) {
      return (
        <Menu.Item
          key={`main${item.id}`}
          icon={item.icon}
          onClick={() => {
            directRoute(item.url);
          }}
        >
          <Link to={item.url}>{item.name}</Link>
        </Menu.Item>
      );
    }
    return renderSubMenuItem(item);
  }

  function renderSubMenuItem(item: NavItem) {
    rootSubmenuKeys.push(`sub${item.id}`);
    return (
      <Menu.SubMenu key={`sub${item.id}`} icon={item.icon} title={item.name}>
        {item.children &&
          item.children.map((nav: NavItem) => {
            return renderMenuItem(nav);
          })}
      </Menu.SubMenu>
    );
  }

  return (
    <Menu className="sidebar-full-height" mode="inline" openKeys={openKeys} onOpenChange={onOpenChangeMenu}>
      {renderMenus()}
    </Menu>
  );
};

export default React.memo(PermissionRoute);
