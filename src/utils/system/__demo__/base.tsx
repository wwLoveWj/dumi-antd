import { Button } from 'antd';
import { createNotification } from 'magical-antd-ui';
import React from 'react';
export default function Base() {
  //   useEffect(() => {
  //     createNotification('你好，欢迎来到魔幻世界~');
  //   }, []);
  return (
    <>
      <h1 style={{ marginBottom: '20px' }}>桌面通知</h1>
      <Button
        id="enable"
        type="primary"
        onClick={() =>
          createNotification('你好，欢迎来到魔幻世界~', { body: 'yyds' })
        }
      >
        启用通知
      </Button>
    </>
  );
}
