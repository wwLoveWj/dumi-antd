//demo
/**
 * title: 基本使用
 * description:
 */

import { Button } from 'antd';
import { WjModal } from 'magical-antd-ui';
import React from 'react';

const MyModal = WjModal.create(() => {
  const modal = WjModal.useModal();
  return (
    <WjModal {...modal.props} title={'弹窗标题'}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </WjModal>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => WjModal.open(MyModal)}>打开</Button>
    </>
  );
};
