/**
 * title: 独立使用
 */
import { Space } from 'antd';
import { WjActionButton } from 'magical-antd-ui';
import React from 'react';

export default () => (
  <Space direction="vertical">
    <Space>
      <WjActionButton type="link">正常</WjActionButton>
      <WjActionButton type="link" disabled={true} content="禁用提示">
        禁用
      </WjActionButton>
    </Space>
    <Space>
      <WjActionButton>正常</WjActionButton>
      <WjActionButton disabled={true} content="禁用提示">
        禁用
      </WjActionButton>
    </Space>
  </Space>
);
