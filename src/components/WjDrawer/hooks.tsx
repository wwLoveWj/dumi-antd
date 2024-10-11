import React, { useRef } from 'react';
import WjDrawer from './drawer';
import type { UseOpenType, WjDrawerAction, WjDrawerProps } from './types.d';

export const useOpen: UseOpenType = () => {
  const actionRef = useRef<WjDrawerAction>(null);

  const NewModal: React.FC<WjDrawerProps> = (props) => {
    return <WjDrawer {...props} ref={actionRef} />;
  };

  return [
    NewModal,
    {
      toggle: () => actionRef.current?.toggle(),
      setOpen: (open) => actionRef.current?.setOpen(open),
    },
  ];
};
