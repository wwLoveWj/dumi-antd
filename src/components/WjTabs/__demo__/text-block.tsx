/**
 * title: 容器标签页(三级)
 * description: 轻量标签页,适用于页面的指定容器中,建议选项不超过 4 个时使用
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
      <WjTabs type="text-block" items={items} defaultActiveKey="yyds" />
    </div>
  );
};
