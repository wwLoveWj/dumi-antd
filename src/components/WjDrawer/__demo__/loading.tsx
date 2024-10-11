/**
 * title: 内置loading
 * description:
 */
import { Button } from 'antd';
import { WjDrawer } from 'magical-antd-ui';
import React from 'react';
const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const MyModal = WjDrawer.create(() => {
  const modal = WjDrawer.useDrawer();

  const handleOk = async () => {
    await sleep();
  };

  const handleCancel = async () => {
    await sleep();
  };

  return (
    <WjDrawer
      {...modal.props}
      title={'弹窗标题'}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </WjDrawer>
  );
});

export default () => {
  return <Button onClick={() => WjDrawer.open(MyModal)}>打开</Button>;
};
