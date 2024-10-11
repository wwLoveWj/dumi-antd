import { Button, Drawer } from 'antd';
import { isUndefined } from 'lodash-es';
import { useTrigger } from 'magical-antd-ui';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { InModalDrawerContext } from '../WjModal/contexts/InModal';
import type { WjDrawerAction, WjDrawerProps } from './types.d';

const SIZE_WIDTH_MAP = {
  small: 500,
  middle: 700,
  large: 900,
};

const WjDrawer = forwardRef<WjDrawerAction, WjDrawerProps>((props, ref) => {
  const {
    destroyOnClose = true,
    maskClosable = false,
    onOk,
    onCancel,
    closable,
    footer,
    okButtonProps,
    okText,
    cancelText,
    cancelButtonProps,
    onClose,
    size = 'small',
    width,
    extraContentRender,
    children,
    ...restProps
  } = props;
  const { open, trigger, toggle, setOpen } = useTrigger(props);

  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

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

  const handleCancel = async (e: React.MouseEvent | React.KeyboardEvent) => {
    try {
      setCancelLoading(true);
      await onCancel?.();
      setOpen(false);
      onClose?.(e);
    } finally {
      setCancelLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    toggle,
    setOpen,
  }));

  const defaultFooterRender = () => {
    return (
      <div style={{ textAlign: 'right' }}>
        <Button
          loading={cancelLoading}
          disabled={okLoading}
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText ?? '取消'}
        </Button>
        <Button
          loading={okLoading}
          disabled={cancelLoading}
          style={{ marginLeft: 8 }}
          type="primary"
          onClick={handleOk}
          {...okButtonProps}
        >
          {okText ?? '确定'}
        </Button>
      </div>
    );
  };

  return (
    <InModalDrawerContext.Provider value={{ inContext: true }}>
      {trigger}
      <Drawer
        width={_width}
        open={open}
        destroyOnClose={destroyOnClose}
        maskClosable={maskClosable}
        placement="right"
        closable={
          isUndefined(closable) ? !(okLoading || cancelLoading) : closable
        }
        footer={isUndefined(footer) ? defaultFooterRender() : footer}
        onClose={handleCancel}
        {...restProps}
      >
        {extraContentRender}
        {children}
      </Drawer>
    </InModalDrawerContext.Provider>
  );
});

export default WjDrawer;
