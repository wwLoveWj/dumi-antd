import type { ButtonProps, MenuProps, PopoverProps } from 'antd';

export type DisabledProps = {
  disabled: boolean;
  content?: string;
  popover?: PopoverProps;
};

export interface ItemsProps
  extends Omit<MenuProps['items'], 'disabled'>,
    Omit<ButtonProps, 'disabled' | 'children'>,
    Omit<DisabledProps, 'disabled'> {
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean | DisabledProps[];
  items?: ItemsProps[];
  key?: React.Key;
}

export type MsActionsItems = ItemsProps[];

export type RenderItemsProps = ItemsProps | React.ReactNode;

// export interface ItemsProps extends Omit<ButtonProps, 'disabled'>, Omit<DisabledProps, 'disabled'> {
//   label: React.ReactNode;
//   onClick?: () => void;
//   disabled?: boolean | DisabledProps[];
// }

export interface WjActionsProps {
  /**
   * 菜单显示几个按钮 其他放入 ...  传入-1 显示全部
   * @default 3
   * @deprecated
   */
  lint?: number;
  /**
   * 菜单显示几个按钮 其他放入 ...  传入-1 显示全部
   * @default 3
   */
  limit?: number;
  /**
   * 间距
   * @default 0
   */
  size?: number;
  /**
   * @deprecated
   */
  children?: React.ReactNode;
  /** actionsType为button时，如果超过limit，设置ellipsis为true会显示...，否则显示更多按钮 */
  ellipsis?: boolean;
  items?: (ItemsProps | boolean)[];
  actionsType?: 'button' | 'link' | 'text';
}
