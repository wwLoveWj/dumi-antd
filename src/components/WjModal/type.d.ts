import type { ModalProps } from 'antd';
import type { ComponentType, ReactNode } from 'react';

export type MsModalProps = Omit<ModalProps, 'onOk' | 'onCancel'> & {
  type?: string;
  titleContent?: ReactNode;
  leftContent?: ReactNode;
  RightContent?: ReactNode;
  footerContent?: ReactNode;
  trigger?: ReactNode;
  onOk?: () => Promise<any>;
  onCancel?: () => Promise<any>;
  onClose?: () => void;
  size?: 'small' | 'middle' | 'large';
};

export type UseOpenType = () => [
  ComponentType<MsModalProps>,
  { toggle: () => void; setOpen: (open: boolean) => void },
];

export type MsModalAction = {
  toggle: () => void;
  setOpen: (open: boolean) => void;
};

export type MsInModalDrawerContext = { inContext: boolean };
