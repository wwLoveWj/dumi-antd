/**
 * title: 文字标签页(三级)
 * description: 轻量标签页,适用于页面中小模块的内容区域切换
 */

import { WjTabs } from 'magical-antd-ui';

const items = ['创世纪', 'iam', '锦城悦听', 'yyds'].map((i) => ({
  label: i,
  key: i,
  children: `${i} 内容区域`,
}));

export default () => {
  return (
    <div style={{ height: 200 }}>
      <WjTabs type="text" items={items} defaultActiveKey="iam" />
    </div>
  );
};
