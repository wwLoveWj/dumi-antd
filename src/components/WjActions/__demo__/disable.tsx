/**
 * title: 禁用提示
 * desc:
 */

import { WjActions } from 'magical-antd-ui';
import React from 'react';

export default () => {
  return (
    <>
      <WjActions
        limit={4}
        items={[
          { label: '正常按钮' },
          { label: '单条件禁用', disabled: true, content: '禁用提示' },
          {
            label: '多条件禁用 - 单禁用',
            disabled: [
              { disabled: false, content: '禁用条件一提示' },
              { disabled: true, content: '禁用条件二提示' },
            ],
          },
          {
            label: '多条件禁用 - 多禁用',
            disabled: [
              { disabled: true, content: '条件1和条件2都禁用，提示条件1提示' },
              { disabled: true, content: '禁用条件二提示' },
            ],
          },
          {
            label: (
              <a target={'_blank'} href="//www.baidu.com/" rel="noreferrer">
                禁用链接
              </a>
            ),
            disabled: [{ disabled: true, content: '禁用提示' }],
          },
        ]}
      />
    </>
  );
};
