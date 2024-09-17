// src/PrimaryButton/index.tsx
import { Button, ButtonProps } from 'antd';
import React, { memo } from 'react';

type IPrimaryButtonProps = Omit<ButtonProps, 'type'>;

const PrimaryButton: React.FC<IPrimaryButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Button {...rest} type="primary">
      {children}
    </Button>
  );
};

export default memo(PrimaryButton);
