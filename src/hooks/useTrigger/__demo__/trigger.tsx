/**
 * title: trigger 方式
 * description: 通过 useTrigger 封装之后的组件，只需要传 trigger 元素即可实现开关。组件内部会维护 open 状态，同时监听 trigger dom 的 onClick 事件来改变开关状态
 */
import { Button, Modal } from 'antd';
import type { TriggerProps } from 'magical-antd-ui';
import { useTrigger } from 'magical-antd-ui';
import React from 'react';

interface TriggerModalProps extends TriggerProps {
  title?: string;
}

function TriggerModal(props: TriggerModalProps) {
  const { open, onClose, trigger } = useTrigger(props);
  const { title } = props;
  return (
    <>
      {trigger}
      <Modal title={title} open={open} onCancel={onClose} />
    </>
  );
}

function App() {
  return (
    <TriggerModal
      title="trigger 方式"
      trigger={<Button>trigger 方式</Button>}
    />
  );
}

export default App;
