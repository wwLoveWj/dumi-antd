import type { ButtonProps, DrawerProps } from 'antd';
import type { ComponentType, ReactNode } from 'react';

export type WjDrawerProps = Omit<DrawerProps, 'size'> & {
  size?: 'small' | 'middle' | 'large';
  trigger?: React.ReactNode;
  okText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  onOk?: () => Promise<any>;
  cancelText?: React.ReactNode;
  cancelButtonProps?: ButtonProps;
  extraContentRender?: ReactNode;
  onCancel?: () => Promise<any>;
  onClose?: (() => Promise<any>) | (() => void);
};

export type UseOpenType = () => [
  ComponentType<WjDrawerProps>,
  { toggle: () => void; setOpen: (open: boolean) => void },
];

export type WjDrawerAction = {
  toggle: () => void;
  setOpen: (open: boolean) => void;
};
