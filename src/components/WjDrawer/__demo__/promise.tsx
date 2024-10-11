/**
 * title: Promise用法
 * description:
 */
import { Button, Space } from 'antd';
import { WjDrawer } from 'magical-antd-ui';
import React from 'react';
const sleep = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });

const PromiseResolveDrawer = WjDrawer.create((props: { title: string }) => {
  const { title } = props;
  const Drawer = WjDrawer.useDrawer();

  const handleOk = async () => {
    await sleep(1000);
    Drawer.resolve('抽屉Promise成功返回的内容');
    Drawer.close();
  };

  return (
    <WjDrawer {...Drawer.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看提示信息。</p>
    </WjDrawer>
  );
});

const PromiseRejectDrawer = WjDrawer.create((props: { title: string }) => {
  const { title } = props;
  const Drawer = WjDrawer.useDrawer();

  const handleOk = async () => {
    await sleep(1000);
    Drawer.reject('抽屉Promise失败返回的内容');
    Drawer.close();
  };

  return (
    <WjDrawer {...Drawer.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1S之后，查看提示信息。</p>
    </WjDrawer>
  );
});

export default () => {
  return (
    <Space>
      <Button
        onClick={() =>
          WjDrawer.open(PromiseResolveDrawer, { title: 'Resolve成功' }).then(
            alert,
          )
        }
      >
        Promise成功
      </Button>
      <Button
        onClick={() =>
          WjDrawer.open(PromiseRejectDrawer, { title: 'Reject失败' }).catch(
            alert,
          )
        }
      >
        Promise失败
      </Button>
    </Space>
  );
};
