import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { MenuType, TagTypes } from '../../type';
import BasicMenu from './BasicMenu';

const { Sider } = Layout;
export default function LeftMenu(props: {
  /**
   * 项目名
   * @default "项目模板"
   */
  projectName: string;
  /**
   * 路由配置
   * @default []
   */
  routes: TagTypes[];
  themeMenu: MenuType;
  collapsed: boolean;
}) {
  const { routes, projectName, themeMenu, collapsed } = props;

  return (
    <Sider
      className={
        themeMenu === 'light' ? 'sider-area-menu' : 'sider-area-menu-dark'
      }
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      {/* 标题的展开收起，收起展示图标 */}
      <div className="logo">
        <div>{collapsed ? <UserOutlined /> : projectName}</div>
      </div>
      <BasicMenu menus={routes} theme={themeMenu} />
    </Sider>
  );
}
