import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Button, Layout } from 'antd';
import type { ReactElement } from 'react';
import React from 'react';
import { MenuType, TagTypes } from '../../type';
import BasicMenu from './BasicMenu';

const { Sider } = Layout;
export default function LeftMenu(props: {
  /**
   * 项目名
   * @default "项目模板"
   */
  projectName: string | ReactElement;
  /**
   * 路由配置
   * @default []
   */
  routes: TagTypes[];
  themeMenu: MenuType;
  collapsed: boolean;
}) {
  const { routes, projectName, themeMenu } = props;
  const [collapsed, setCollapsed] = useControllableValue(props, {
    valuePropName: 'collapsed',
    trigger: 'setCollapsed',
  });
  return (
    <Sider
      className={
        themeMenu === 'light' ? 'sider-area-menu' : 'sider-area-menu-dark'
      }
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: themeMenu === 'light' ? '#fff' : '#000' }}
    >
      {/* 标题的展开收起，收起展示图标 */}
      <div className="logo">
        <div style={{ color: themeMenu === 'dark' ? '#fff' : '#000' }}>
          {collapsed ? <UserOutlined /> : projectName}
        </div>
      </div>
      <BasicMenu menus={routes} theme={themeMenu} collapsed={collapsed} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 是否收起菜单 */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '20px',
            width: '100%',
            height: 64,
            color: themeMenu === 'light' ? '#000' : '#fff',
          }}
        />
      </div>
    </Sider>
  );
}
