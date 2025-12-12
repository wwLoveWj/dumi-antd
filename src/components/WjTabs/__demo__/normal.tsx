/**
 * title: 默认标签页(二级)
 * description: 大部分情况下适用
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
      <WjTabs items={items} />
    </div>
  );
};
