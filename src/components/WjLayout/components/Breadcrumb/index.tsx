import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Tabs } from 'antd';
import { getTagTitle, TagTypes, useHistoryToPath } from 'magical-antd-ui';
import React, { useEffect, useState } from 'react';
import { useAliveController } from 'react-activation';
import { useLocation } from 'react-router-dom';
// import LabelDropdown from './CloseTabs';
import { pathTxt } from './constant';
import { useLayoutContext } from './LayoutProvider';
import './style.less';
import type { TabTypes } from './type';

const { confirm } = Modal;

const PageTabs = ({
  routes,
  home = '/',
}: {
  routes: TagTypes[];
  home: string;
}) => {
  const { globalEditPages } = useLayoutContext();
  const { dropScope } = useAliveController();
  const { pathname } = useLocation();
  // const navigate = useNavigate();
  // 兼容v5、v6的history跳转
  const { routeChgLink } = useHistoryToPath();
  const [activeKey, setActiveKey] = useState<string>(home);
  const [tabList, setTabList] = useState<any[]>([
    {
      label: '首页',
      key: home,
      closable: false,
    },
  ]);
  // const { title } = useRouteProps();
  // 国际化配置
  //   const intl = useIntl();
  //   const t = (id: string) => intl.formatMessage({ id: title });

  // 关闭页签
  const closeTab = (targetKey: any) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    tabList.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    console.log(tabList, 'tabList----------------------');
    // 找出除当前项之外的所有页面
    const newPanes = tabList.filter((item) => item.key !== targetKey);
    console.log(
      newPanes,
      '其他页面-------------',
      lastIndex,
      'lastIndex---------索引',
    );
    // 判断页签是否为当前选中项，如果是则关闭设置选择项为当前页签的前一个页签，如果不是就直接关闭
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setTabList(newPanes);
    setActiveKey(newActiveKey);
    // 关闭页签清除keepalive缓存
    dropScope(targetKey);
    console.log(newActiveKey, 'newActiveKey-------------新的当前选中项');
    routeChgLink(newActiveKey);
  };

  // 点击关闭tab标签
  const handleRemove = (targetKey: any, action: 'add' | 'remove') => {
    console.log(action, '--------------action关闭模式');
    if (action === 'remove') {
      // 是否存在编辑项
      const isEditing = globalEditPages[targetKey] || false;
      if (isEditing) {
        confirm({
          title: `${pathTxt[targetKey] || ''}`,
          icon: <ExclamationCircleOutlined />,
          okText: '关闭',
          cancelText: '取消关闭',
          onOk() {
            closeTab(targetKey);
          },
          onCancel() {},
        });
      } else {
        closeTab(targetKey);
      }
    }
  };

  // 点击tab切换路由
  const onChange = (newActiveKey: string) => {
    routeChgLink(newActiveKey);
  };

  // 路由变化设置选择项
  const initSetTabs = (path: string) => {
    const pathList: string[] = [];
    tabList?.forEach((item: TabTypes) => {
      pathList.push(item.key);
    });
    console.log(tabList, 'tabList-------------', path);
    // 判断当前路由是否在页签里，不在就加入页签
    if (!pathList.includes(path) && path !== '/') {
      const pathTitle = getTagTitle(path, routes);
      setTabList([...tabList, { label: pathTitle, key: path }]);
    }
    setActiveKey(path);
  };

  useEffect(() => {
    initSetTabs(pathname);
  }, [pathname]);

  return (
    <div className={'user-page-tabs'}>
      <Tabs
        size="small"
        type="editable-card"
        tabPosition={'top'}
        hideAdd
        style={{ height: 220 }}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={handleRemove}
        items={tabList}
      />
      {/* 两者择其一 */}
      {/* <LabelDropdown /> */}
    </div>
  );
};

export default PageTabs;
