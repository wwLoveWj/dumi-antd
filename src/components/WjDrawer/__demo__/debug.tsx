/**
 * title: 开发调试
 * description:
 * debug: true
 */

import { Button } from 'antd';
import { WjDrawer } from 'magical-antd-ui';
import React from 'react';

const MyModal = WjDrawer.create((props: { title: string }) => {
  const { title } = props;
  const drawer = WjDrawer.useDrawer();

  const handleOk = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
        drawer.resolve('hello world');
        drawer.close();
      }, 2000);
    });
  };

  return <WjDrawer {...drawer.props} onOk={handleOk} title={title} />;
});

export default () => {
  const handleOpen = () => {
    WjDrawer.open(MyModal, { title: '你好你好' }).then(console.log);
  };

  return <Button onClick={handleOpen}>打开</Button>;
};
