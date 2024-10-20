import type { ButtonProps, PopoverProps } from 'antd';
import type React from 'react';

export type WjActionButtonProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  popover?: PopoverProps;
  actionsType?: ButtonProps['type'];
} & ButtonProps;
