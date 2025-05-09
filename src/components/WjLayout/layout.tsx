import { HomeOutlined, LaptopOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import {
  getAllNodes,
  // getCurrentTime,
  getTagTitle,
} from 'magical-antd-ui';
import React, { useEffect, useRef, useState } from 'react';
import { KeepAlive } from 'react-activation';
import { Outlet, useLocation } from 'react-router-dom';
import { Iprops, TagTypes } from './type';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import LeftMenu from './components/BasicComp/LeftMenu';
import RightTopHeader from './components/HeaderComp';
import { useRouteInfo } from './hooks/useRouteInfo';
import './style.less';

const { Content } = Layout;

const Index: React.FC<Iprops> = ({
  avatarItems,
  routes: menus,
  projectName,
  isShowHeader = false,
  unreadMsgcount,
  children,
  isRawData = false,
  extraRender, //设置处额外的操作区域
  themeMenu = 'dark',
  headerStyle = { background: '#fff' }, //头部的背景色
  themeColor = '#001629',
}) => {
  console.log('我被渲染了吗？');
  // 获取到所有的菜单数据进行处理
  const routes = !isRawData
    ? menus
    : menus
        ?.find((route) => route.path === '/')
        ?.routes?.filter((item: any) => !item.redirect) || [];

  const countDownTimer = useRef<any>(null); // 倒计时标记
  // const [timeView] = useState<any>(null); // 倒计时显示

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false); //菜单收起展开
  const { path, title, id } = useRouteInfo(routes);
  const { pathname } = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: any; path: string; className?: string }[]
  >([]); //面包屑的配置项

  // 路由变化设置选择项
  const initSetTabs = (path: string) => {
    const addBreadcrumbItem = (path: string, title: React.ReactNode) => ({
      path,
      title,
      className: 'disabled-breadcrumb-item',
    });
    const segments = path.split('/')[1];
    const newAllRoutes = getAllNodes(routes);
    // 拿到当前路由对象信息
    let routeItem: TagTypes | undefined = newAllRoutes.find(
      (val: TagTypes) => val.key === segments,
    );
    let breadcrumbItems: { title: any; path: string; className?: string }[] = [
      {
        path: '/',
        title: <HomeOutlined />,
      },
    ];
    // 存在子路由的项
    if (routeItem && routeItem?.routes && routeItem?.routes?.length > 0) {
      const pathTitle = getTagTitle('/' + segments, routes);
      console.log(pathTitle, '存在父级路由', segments);
      breadcrumbItems.push(
        addBreadcrumbItem(
          '/' + segments,
          <>
            <LaptopOutlined />
            <span>{pathTitle}</span>
          </>,
        ),
      );
    }
    console.log(breadcrumbItems, '1', segments);
    // 不存在子路由的项
    const pathTitle1 = getTagTitle(path, routes);
    breadcrumbItems.push(addBreadcrumbItem(path, pathTitle1));
    console.log(breadcrumbItems, '2', segments);
    setBreadcrumbItems(breadcrumbItems);
  };
  // 切换路由以及变更语言时路由内容都会有变化
  useEffect(() => {
    if (pathname !== '/') initSetTabs(pathname);
  }, [pathname]);

  useEffect(() => {
    // 获取当前时间
    // countDownTimer.current = setInterval(() => {
    //   setTimeView(getCurrentTime());
    // }, 1000);
    // 监听外部窗口宽度的变化，如果小于 1024px，自动收起侧边栏
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(countDownTimer.current);
      window.removeEventListener('resize', handleResize);
      // 原文链接：https://blog.csdn.net/guohaosir/article/details/130753433
    };
  }, []);

  return (
    <Layout>
      <Layout>
        {/* 左侧菜单路由 */}
        <LeftMenu
          collapsed={collapsed}
          themeMenu={themeMenu}
          routes={routes}
          projectName={projectName}
        />
        {/* 右侧内容区 */}
        <Layout style={{ background: '#f5f5f5' }}>
          {/* TODO: */}
          <RightTopHeader
            breadcrumbItems={breadcrumbItems}
            themeColor={themeColor}
            isShowHeader={isShowHeader}
            extraRender={extraRender}
            headerStyle={headerStyle}
            avatarItems={avatarItems}
            unreadMsgcount={unreadMsgcount}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <Layout style={{ padding: 12 }}>
            <Content
              style={{
                margin: 0,
                // padding: 12, //内部容器的padding
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                // background: 'yellow',
                // 高度需要减去headers、面包屑这些
                height: 'calc(100vh - 152px + 64px)',
                overflow: 'auto',
              }}
            >
              <KeepAlive id={id} name={path} tabName={title}>
                {children ? children : <Outlet />}
              </KeepAlive>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;
