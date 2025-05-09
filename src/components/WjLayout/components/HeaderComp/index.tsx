import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Breadcrumb, Button, Layout } from 'antd';
import { WjBreadcrumb } from 'magical-antd-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderPropsType } from '../../type';
import { RightSetting } from './RightSetting';
const { Header } = Layout;

export default function HeaderComp(props: HeaderPropsType) {
  const {
    isShowHeader,
    themeColor,
    extraRender,
    headerStyle,
    breadcrumbItems,
    avatarItems,
    unreadMsgcount,
  } = props;
  const [collapsed, setCollapsed] = useControllableValue(props, {
    valuePropName: 'collapsed',
    trigger: 'setCollapsed',
  });
  const connectInfo = (window.navigator as any).connection; //网络信息
  function itemRender(route: any, params: any, routes: any, paths: string[]) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.title}</span>
    ) : (
      <Link to={paths.join('/')}>{route.title}</Link>
    );
  }
  return (
    <>
      {isShowHeader && (
        <Header
          style={{
            background: themeColor,
            // display: 'none',
          }}
          className="allHeaderInfo"
        >
          <div className="settings">
            {/* 是否收起菜单 */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '20px',
                width: 20,
                height: 64,
                color: '#fff',
              }}
            />
            <div className="onlineInfo">
              <span>网络状态：{connectInfo.effectiveType}</span>
              <span>延迟：{connectInfo.rtt}ms</span>
              <span>带宽：{connectInfo.downlink} Mb/s</span>
            </div>
            {/* 右侧额外的操作区域 */}
            {extraRender && <div>{extraRender}</div>}
            <RightSetting
              style={{ color: '#fff' }}
              avatarItems={avatarItems}
              unreadMsgcount={unreadMsgcount}
            />
          </div>
        </Header>
      )}
      <div style={headerStyle}>
        <div className="settings-right">
          <Breadcrumb
            style={{ padding: '4px 12px' }}
            items={breadcrumbItems}
            itemRender={itemRender}
          />
          {!isShowHeader && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                right: '18px',
                top: '18px',
              }}
            >
              {/* 右侧额外的操作区域 */}
              {extraRender && <div>{extraRender}</div>}
              <RightSetting
                avatarItems={avatarItems}
                unreadMsgcount={unreadMsgcount}
              />
            </div>
          )}
        </div>
        {/* 打开的路由页签 */}
        {!isShowHeader && <WjBreadcrumb />}
      </div>
    </>
  );
}
