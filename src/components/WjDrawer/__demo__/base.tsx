/**
 * title: 基本使用
 * description:
 */

import { Button } from 'antd';
import { WjDrawer } from 'magical-antd-ui';
import React from 'react';

const MyDrawer = WjDrawer.create(() => {
  const drawer = WjDrawer.useDrawer();
  return (
    <WjDrawer {...drawer.props} title={'抽屉标题'}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </WjDrawer>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => WjDrawer.open(MyDrawer)}>打开</Button>
    </>
  );
};
