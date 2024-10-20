import { Button, Popover } from 'antd';
import React from 'react';
import type { WjActionButtonProps } from './type';

const WjActionButton: React.FC<WjActionButtonProps> = (props) => {
  const { children, content, popover, actionsType, ...restProps } = props;
  let MyButton = null;
  switch (actionsType) {
    case 'link':
      MyButton = (
        <Button
          block
          size="small"
          type="link"
          {...restProps}
          style={{ padding: 0, textAlign: 'left', ...restProps.style }}
        >
          {children}
        </Button>
      );
      break;
    case 'text':
      MyButton = (
        <Button
          block
          type="text"
          size="small"
          {...restProps}
          style={{ textAlign: 'left', ...restProps.style }}
        >
          {children}
        </Button>
      );
      break;

    default:
      MyButton = <Button {...restProps}>{children}</Button>;
      break;
  }
  if (content && restProps?.disabled) {
    return (
      <Popover
        content={content}
        trigger="hover"
        placement="bottom"
        {...popover}
      >
        {MyButton}
      </Popover>
    );
  }
  return MyButton;
};

export default WjActionButton;
