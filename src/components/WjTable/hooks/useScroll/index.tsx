import { isNil, merge, omit } from 'lodash-es';
import { useMemo, useRef } from 'react';

import type { WjTableProps } from '../../type';
import useDomRect from './useDomRect';

type ExtraProps = {
  size: string;
};

function useScroll<P, R>(props: WjTableProps<P, R>, extraProps: ExtraProps) {
  const {
    scroll: _scroll = {},
    search,
    noCard,
    sticky,
    filteredViewRender,
  } = props;
  const { size } = extraProps;
  const defaultScroll = { x: '100%', scrollToFirstRowOnChange: true };
  const scroll = merge(defaultScroll, _scroll);

  // table 内容区域
  const tableAreaRef = useRef<HTMLDivElement>(null);
  // footer 内容区域
  const footerAreaRef = useRef<HTMLDivElement>(null);
  // table footer 内容区域
  const tableFooterAreaRef = useRef<HTMLDivElement>(null);

  const [tableAreaRect, viewport] = useDomRect(
    tableAreaRef.current?.querySelector('tbody') ?? null,
    [size, filteredViewRender],
  );
  const [footerAreaRect] = useDomRect(footerAreaRef.current);
  const [tableFooterAreaRect] = useDomRect(tableFooterAreaRef.current);

  const tableScroll = useMemo(() => {
    if (scroll.y === 'auto-content') {
      // aggr 类型要忽略自适应高度
      if (search && search.filterType === 'aggr') {
        return scroll;
      }
      if (tableAreaRect && viewport) {
        const tableFooterHeight = isNil(tableFooterAreaRect)
          ? 0
          : tableFooterAreaRect.height + 16;
        const footerHeight = footerAreaRect?.height ?? 0;
        // 表格容器的padding
        const cardPaddingHeight = noCard ? 0 : 20;
        // 页面容器的底部padding，MsLayout下12px，MsDevopsLayout下16px
        const containerBottomHeight = 12;

        const tableY =
          viewport.height -
          tableAreaRect.top -
          tableFooterHeight -
          footerHeight -
          cardPaddingHeight -
          containerBottomHeight -
          // 莫名差1px，减掉就好了
          1;
        return { ...scroll, y: tableY };
      }
    }

    return scroll;
  }, [
    scroll,
    search,
    tableAreaRect,
    viewport,
    tableFooterAreaRect,
    footerAreaRect?.height,
    noCard,
  ]);

  function scrollToFirstRow() {
    if (tableScroll.scrollToFirstRowOnChange) {
      if (sticky) {
        tableAreaRef.current?.scrollIntoView?.({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        tableAreaRef.current
          ?.querySelector('tbody')
          ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  return {
    // 不要 ant table 的实现，自己用 scrollToFirstRow 实现
    scroll: omit(tableScroll, 'scrollToFirstRowOnChange'),
    tableAreaRef,
    footerAreaRef,
    tableFooterAreaRef,
    scrollToFirstRow,
  };
}

export default useScroll;
