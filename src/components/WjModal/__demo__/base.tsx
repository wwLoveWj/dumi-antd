//demo
/**
 * title: 基本使用
 * description:
 */

import { Button } from 'antd';
import { MsModal } from 'magical-antd-ui';
import React from 'react';

const MyModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  return (
    <MsModal {...modal.props} title={'弹窗标题'}>
      <p>一些描述...</p>
      <p>一些描述...</p>
      <p>一些描述...</p>
    </MsModal>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsModal.open(MyModal)}>打开</Button>
    </>
  );
};
