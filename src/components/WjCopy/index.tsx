import { message } from 'antd';
import { isNil } from 'lodash-es';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.less';

import type { WjCopyPropsType } from './type.d';

const MsCopy = (props: WjCopyPropsType) => {
  const { text, children } = props;

  if (isNil(text) || text === '') {
    return <>{children}</>;
  }

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        message.destroy();
        message.success('复制成功');
      }}
    >
      <div className="ms-copy" style={{ cursor: 'pointer' }}>
        {children}
      </div>
    </CopyToClipboard>
  );
};

export default MsCopy;
