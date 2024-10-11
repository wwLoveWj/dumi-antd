/**
 * title: 尺寸
 * description:
 */
import { Button, Space } from 'antd';
import type { WjDrawerProps } from 'magical-antd-ui';
import { WjDrawer } from 'magical-antd-ui';
import React from 'react';

const MyDrawer = WjDrawer.create((props: WjDrawerProps) => {
  const drawer = WjDrawer.useDrawer();
  return (
    <WjDrawer {...drawer.props} {...props}>
      <p>一些内容...</p>
      <p>一些内容...</p>
      <p>一些内容...</p>
    </WjDrawer>
  );
});

export default () => {
  return (
    <Space>
      <Button
        onClick={() =>
          WjDrawer.open(MyDrawer, { title: 'small', size: 'small' })
        }
      >
        small(500px)
      </Button>

      <Button
        onClick={() =>
          WjDrawer.open(MyDrawer, { title: 'middle', size: 'middle' })
        }
      >
        middle(700px)
      </Button>

      <Button
        onClick={() =>
          WjDrawer.open(MyDrawer, { title: 'large', size: 'large' })
        }
      >
        large(900px)
      </Button>

      <Button
        onClick={() =>
          WjDrawer.open(MyDrawer, { title: '自定义宽度', width: 999 })
        }
      >
        width=999px
      </Button>
    </Space>
  );
};
