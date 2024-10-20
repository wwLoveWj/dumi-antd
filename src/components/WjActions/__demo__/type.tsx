/**
 * title: 按钮类型
 */

import { Space } from 'antd';
import { WjActions } from 'magical-antd-ui';
import React from 'react';

export default () => {
  return (
    <>
      <Space size="large" direction="vertical">
        <WjActions
          limit={3}
          actionsType="link"
          items={[
            { label: '按钮1' },
            { label: '按钮2' },
            { label: '按钮3' },
            { label: '按钮4' },
            { label: '按钮5' },
          ]}
        />
        <WjActions
          limit={3}
          actionsType="button"
          items={[
            { label: '按钮1' },
            { label: '按钮2' },
            { label: '按钮3' },
            { label: '按钮4' },
            { label: '按钮5' },
          ]}
        />
        <WjActions
          limit={3}
          ellipsis
          actionsType="button"
          items={[
            { label: '按钮1' },
            { label: '按钮2' },
            { label: '按钮3' },
            { label: '按钮4' },
            { label: '按钮5' },
          ]}
        />
      </Space>
    </>
  );
};
