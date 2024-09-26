import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import type { TagTypes } from 'dumi-umi-ww';
import _ from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export type MenuType = 'light' | 'dark';
const { SubMenu } = Menu; // 子菜单

// 左侧菜单的menu结构数据
function SideBarRender({
  menus,
  theme,
}: {
  /**
   * 菜单路由配置
   */
  menus: TagTypes[];
  /**
   * 主题颜色
   */
  theme: MenuType;
}) {
  const [saveKeyPath, setSaveKeyPath] = useState<string[]>([]); //存储选中的菜单路径集合
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]); //存储打开的子菜单集合
  const { pathname } = useLocation();
  // 国际化配置
  //   const intl = useIntl();
  //   const t = (id: string) => intl.formatMessage({ id });

  /**
   * 获取左侧菜单项
   * @param menuArr 所有的路由配置
   * @returns
   */
  function getMenuItem(menuArr: TagTypes[]) {
    // 获取菜单项
    return _.map(menuArr, (route: TagTypes) => {
      if (route.routes) {
        // 有多级菜单时
        return (
          !route.hidden && (
            <SubMenu
              key={route.path}
              title={route.title}
              icon={route.icon && React.createElement(route.icon)}
            >
              {/*  重复调用函数渲染出子级菜单 */}
              {getMenuItem(route.routes)}
            </SubMenu>
          )
        );
      }
      return (
        !route.hidden && (
          <Menu.Item
            key={route.path}
            icon={route.icon && React.createElement(route.icon)}
          >
            <Link to={route.path || '/'}>{route.title}</Link>
          </Menu.Item>
        )
      );
    });
  }
  /**
   *
   * @param openKeys 打开的菜单
   */
  const onOpenChange: MenuProps['onOpenChange'] = (openKeys: string[]) => {
    let keys = openKeys.slice(openKeys.length - 1);
    setStateOpenKeys(keys);
  };
  /**
   *
   * @param keyPath 选中的菜单
   */
  const onSelectMenu = ({ keyPath }: { keyPath: string[] }) => {
    setSaveKeyPath(keyPath);
  };

  useEffect(() => {
    //  处理url地址栏直接输入pathname，然后能够选中菜单
    const keys = pathname
      .split('/')
      ?.filter(Boolean)
      .map((item: string) => '/' + item);
    setSaveKeyPath([pathname]);
    setStateOpenKeys(keys);
  }, [pathname]);

  return (
    <Menu
      mode="inline"
      theme={theme}
      selectedKeys={saveKeyPath}
      openKeys={stateOpenKeys}
      style={{ height: `calc(100% - 60px)`, borderRight: 0 }}
      onOpenChange={onOpenChange}
      onSelect={onSelectMenu}
    >
      {getMenuItem(menus)}
    </Menu>
  );
}

export default SideBarRender;
