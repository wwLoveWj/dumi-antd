import React from 'react';

export interface WjCopyPropsType {
  /**
   * 需要复制的文字，如果 children 是纯文字，也可以不传text
   */
  text: string;
  children?: React.ReactNode;
}
