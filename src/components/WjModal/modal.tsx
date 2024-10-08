import { CloseOutlined } from '@ant-design/icons';
import { Card, Modal } from 'antd';
import { isUndefined } from 'lodash';
import { useTrigger } from 'magical-antd-ui';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { InModalDrawerContext } from './contexts/InModal';
import './index.less';
import type { MsModalAction, MsModalProps } from './type.d.ts';

const SIZE_WIDTH_MAP = {
  small: 500,
  middle: 700,
  large: 900,
};

const MsModal = forwardRef<MsModalAction, MsModalProps>((props, ref) => {
  console.log(props);
  const {
    destroyOnClose = true,
    maskClosable = false,
    onOk,
    children,
    onCancel,
    closable,
    size = 'small',
    width,
    type = '',
    className = '',
    okButtonProps,
    cancelButtonProps,
    titleContent = undefined,
    leftContent = undefined,
    RightContent = undefined,
    footerContent = undefined,
    ...restProps
  } = props;
  const { open, trigger, toggle, setOpen } = useTrigger(props);

  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const isDevopsModal = type === 'devops';
  const _width = width ?? (size && SIZE_WIDTH_MAP[size]);

  const handleOk = async () => {
    try {
      setOkLoading(true);
      await onOk?.();
      setOpen(false);
    } finally {
      setOkLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setCancelLoading(true);
      await onCancel?.();
      setOpen(false);
    } finally {
      setCancelLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    toggle,
    setOpen,
  }));

  // devops 里面的弹窗
  const devopsModalProps = isDevopsModal
    ? {
        width: undefined,
        title: null,
        footer: null,
        className: ['ms-devops-modal', className].join(' '),
      }
    : {};

  // MsModal 默认配置
  const modalPorps = {
    width: _width,
    open: open,
    className: className,
    destroyOnClose: destroyOnClose,
    maskClosable: maskClosable,
    okButtonProps: {
      loading: okLoading,
      disabled: cancelLoading,
      ...okButtonProps,
    },
    cancelButtonProps: {
      disabled: okLoading,
      loading: cancelLoading,
      ...cancelButtonProps,
    },
    closable: isUndefined(closable) ? !(okLoading || cancelLoading) : closable,
    closeIcon: <CloseOutlined />,
    onOk: handleOk,
    onCancel: handleCancel,
    ...restProps,
    ...devopsModalProps,
  };

  return (
    <InModalDrawerContext.Provider value={{ inContext: true }}>
      {trigger}
      <Modal {...modalPorps}>
        {!isDevopsModal ? (
          children
        ) : (
          <Card loading={true}>
            <div className="ms-devops-modal-layout">
              <div className="ms-devops-modal-left">
                <div className="ms-devops-modal-title">{titleContent}</div>
                <div className="ms-devops-modal-content">{leftContent}</div>
                <div className="ms-devops-modal-footer">{footerContent}</div>
              </div>
              <div className="ms-devops-modal-right">{RightContent}</div>
            </div>
          </Card>
        )}
      </Modal>
    </InModalDrawerContext.Provider>
  );
});

export default MsModal;
