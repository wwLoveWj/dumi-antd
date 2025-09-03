/**
 * title: 设置宽度
 * description: 设置宽度并拖动需要设置disabled为false 设置min(默认值:200) max(默认值:400) 默认宽度为min的值,如需初始化指定特定值则需传入 width 和 onChange
 */

import { useLocalStorageState } from 'ahooks';
import { WjResizable } from 'magical-antd-ui';
import React from 'react';

export default () => {
  const [width, setWidth] = useLocalStorageState('width', {
    defaultValue: 400,
  });
  return (
    <WjResizable
      min={200}
      max={600}
      height={600}
      width={width}
      onChange={setWidth}
      style={{ overflowY: 'auto' }}
    >
      展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案
    </WjResizable>
  );
};
