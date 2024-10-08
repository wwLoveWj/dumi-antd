/**
 * title: open 方式
 * description: 通过 useTrigger 封装之后的组件，依然支持常规的 open 状态打开/关闭
 */
import { Button, Modal } from 'antd';
import type { TriggerProps } from 'magical-antd-ui';
import { useTrigger } from 'magical-antd-ui';
import React, { useState } from 'react';

interface TriggerModalProps extends TriggerProps {
  title?: string;
}
function TriggerModal(props: TriggerModalProps) {
  const { title } = props;
  const { open, onClose, trigger } = useTrigger(props);
  return (
    <>
      {trigger}
      <Modal title={title} open={open} onCancel={onClose} />
    </>
  );
}

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>open 状态方式</Button>
      <TriggerModal
        title="trigger 方式"
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default App;
