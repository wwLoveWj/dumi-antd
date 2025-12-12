/**
 * title: 标签页布局
 */

import { Radio, Space } from 'antd';
import { WjTabs } from 'magical-antd-ui';
import { useState } from 'react';

const items = ['创世纪', 'iam', '锦城悦听', 'yyds'].map((i) => ({
  label: i,
  key: i,
  children: `${i} 内容区域`,
}));

export default () => {
  const [tabPosition, setTabPosition] = useState<'left' | 'top'>('top');

  return (
    <div style={{ height: 200 }}>
      <Space style={{ marginBottom: 30 }}>
        布局：
        <Radio.Group
          value={tabPosition}
          onChange={(e) => {
            setTabPosition(e.target.value);
          }}
        >
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
        </Radio.Group>
      </Space>
      <WjTabs
        syncToUrl
        tabKeyName="layout"
        tabPosition={tabPosition}
        items={items}
      />
    </div>
  );
};
