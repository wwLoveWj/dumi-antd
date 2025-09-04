import React, { useRef } from 'react';
import WjModal from './modal';

import type { MsModalAction, MsModalProps, UseOpenType } from './type.d';

export const useOpen: UseOpenType = () => {
  const actionRef = useRef<MsModalAction>(null);

  const NewModal: React.FC<MsModalProps> = (props) => {
    return <WjModal {...props} ref={actionRef} />;
  };

  return [
    NewModal,
    {
      toggle: () => actionRef.current?.toggle(),
      setOpen: (open) => actionRef.current?.setOpen(open),
    },
  ];
};
