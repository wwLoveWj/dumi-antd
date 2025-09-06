/**
 * title: wj创建弹窗
 * description:
 */

import { Button } from 'antd';
import { WjModal } from 'magical-antd-ui';
import React from 'react';
const MyModal = WjModal.create(() => {
  const modal = WjModal.useModal();

  const renderFooter = () => {
    return (
      <div className="ms-btn-wrap">
        <Button type="primary">纪要归档</Button>
        <Button>保存草稿</Button>
        <Button>取消</Button>
      </div>
    );
  };
  return (
    <WjModal
      type="wj"
      titleContent={'标题节点'}
      leftContent={'左侧节点'}
      RightContent={'右侧节点'}
      footerContent={renderFooter()}
      {...modal.props}
    >
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
