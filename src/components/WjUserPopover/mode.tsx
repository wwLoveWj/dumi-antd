import React, { useContext } from 'react';

import type { MsFormModeContextType } from './types';

// 用于全局控制编辑模式
export const ModeContext = React.createContext<MsFormModeContextType>({
  mode: 'edit',
  enumLoadingType: 'default',
  emptyText: '-',
});

/**
 * 获取当前项的编辑模式
 * @param column
 * @returns
 */
export const useFieldModeContext = (column: any = {}) => {
  const { mode: fieldMode, emptyText: fieldEmptyText } = column;
  const {
    mode: contextMode,
    enumLoadingType,
    emptyText,
  } = useContext(ModeContext);
  return {
    mode: fieldMode ?? contextMode ?? 'edit',
    emptyText: fieldEmptyText ?? emptyText ?? '-',
    enumLoadingType: enumLoadingType ?? 'default',
  };
};
