import {
  HomeOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  theme,
} from 'antd';
import {
  getAllNodes,
  // getCurrentTime,
  getTagTitle,
  TagTypes,
} from 'magical-antd-ui';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import { KeepAlive } from 'umi-plugin-keep-alive';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import WjBreadcrumb from './components/Breadcrumb';
import SideBarRender from './components/Menu';
import './style.less';

const { Header, Content, Sider } = Layout;
export type MenuType = 'light' | 'dark';
interface Iprops {
  /**
   * 是否隐藏头部布局，只显示面包屑简易模式
   * @default false
   */
  isShowHeader?: boolean;
  /**
   * 头像处的下拉设置菜单
   */
  avatarItems?: MenuProps['items'];
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
  /**
   * 路由首页路径
   * @default "/home"
   */
  home: string;
  /**
   * 未读消息数量
   */
  unreadMsgcount?: number;
}
const Index: React.FC<Iprops> = ({
  avatarItems,
  routes: menus,
  projectName,
  home,
  isShowHeader,
  unreadMsgcount,
  // children,
}) => {
  console.log('我被渲染了吗？');
  // 获取到所有的菜单数据进行处理
  const routes =
    menus
      ?.find((route) => route.path === '/')
      ?.routes?.filter((item: any) => !item.redirect) || [];

  const countDownTimer = useRef<any>(null); // 倒计时标记
  const [timeView] = useState<any>(null); // 倒计时显示
  const connectInfo = (window.navigator as any).connection; //网络信息

  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const [themeMenu] = useState<MenuType>('dark');
  const [themeColor] = useState('#001629'); //切换headers主题

  const [collapsed, setCollapsed] = useState(false); //菜单收起展开
  // const { path, title, id } = useRoutes();
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

    let arr = [];
    // 存在子路由的项
    if (routeItem && routeItem?.routes && routeItem?.routes?.length > 0) {
      const pathTitle = getTagTitle('/' + segments, routes);
      arr.push(
        addBreadcrumbItem(
          path,
          <>
            <LaptopOutlined />
            <span>{pathTitle}</span>
          </>,
        ),
      );
    }
    // 不存在子路由的项
    const pathTitle1 = getTagTitle(path, routes);
    arr.push(addBreadcrumbItem(path, pathTitle1));
    setBreadcrumbItems([
      {
        path: '/',
        title: <HomeOutlined />,
      },
      ...arr,
    ]);
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

  // 头部设置
  const Setting = memo(({ style = {} }: { style?: object }) => {
    console.log('干啥呢？我又被渲染了~');
    return (
      <>
        <div style={style}>{timeView}</div>
        {/* 个人设置 */}
        <Dropdown menu={{ items: avatarItems }} placement="bottomRight" arrow>
          <Badge count={unreadMsgcount}>
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              style={{
                backgroundColor: '#f56a00',
                marginLeft: '12px',
                cursor: 'pointer',
              }}
            />
          </Badge>
        </Dropdown>
      </>
    );
  });
  return (
    <Layout>
      <Layout>
        {/* 左侧菜单路由 */}
        <Sider
          className="sider-area-menu"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          {/* 标题的展开收起，收起展示图标 */}
          <div className="logo">
            <div>{collapsed ? <UserOutlined /> : projectName}</div>
          </div>
          <SideBarRender menus={routes} theme={themeMenu} />
        </Sider>
        {/* 右侧内容区 */}
        <Layout style={{ background: '#f0f3f4' }}>
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
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
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
                <Setting style={{ color: '#fff' }} />
              </div>
            </Header>
          )}
          <div className="settings-right">
            <Breadcrumb
              style={{ padding: '6px 12px', background: '#fff' }}
              items={breadcrumbItems}
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
                <Setting />
              </div>
            )}
          </div>
          {/* 打开的路由页签 */}
          {!isShowHeader && <WjBreadcrumb routes={routes} home={home} />}
          <Layout style={{ padding: 12 }}>
            <Content
              style={{
                margin: 0,
                // padding: 12, //内部容器的padding
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                // background: "#fff",
                // 高度需要减去headers、面包屑这些
                height: 'calc(100vh - 152px + 64px)',
                overflow: 'auto',
              }}
            >
              {/* <KeepAlive id={id} name={path} tabName={title}> */}
              <Outlet />
              {/* {children} */}
              {/* </KeepAlive> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;
