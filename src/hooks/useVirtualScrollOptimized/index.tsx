// hooks/useVirtualScroll.ts
import { useMemo, useState } from 'react';
interface VirtualScrollConfig {
  containerHeight: number;
  itemHeight?: number; // 固定高度模式
  estimatedItemHeight?: number; // 不定高模式的预估高度
  bufferSize?: number;
}

export const useVirtualScroll = <T,>(
  data: T[],
  config: VirtualScrollConfig,
) => {
  const {
    containerHeight,
    itemHeight,
    estimatedItemHeight = 50,
    bufferSize = 5,
  } = config;

  const [scrollTop, setScrollTop] = useState(0);
  const [measuredHeights, setMeasuredHeights] = useState<
    Record<number, number>
  >({});

  // 计算总高度（定高或不定高）
  const totalHeight = useMemo(() => {
    if (itemHeight) {
      // 定高模式
      return data.length * itemHeight;
    } else {
      // 不定高模式
      let total = 0;
      for (let i = 0; i < data.length; i++) {
        total += measuredHeights[i] || estimatedItemHeight;
      }
      return total;
    }
  }, [data.length, itemHeight, measuredHeights, estimatedItemHeight]);

  // 计算可见区域
  const { startIndex, endIndex, visibleData } = useMemo(() => {
    if (itemHeight) {
      // 定高模式计算
      const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - bufferSize,
      );
      const endIndex = Math.min(
        data.length - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight) + bufferSize,
      );

      return {
        startIndex,
        endIndex,
        visibleData: data.slice(startIndex, endIndex + 1),
      };
    } else {
      // 不定高模式计算
      let startIndex = 0;
      let currentHeight = 0;

      // 找到起始索引
      while (
        startIndex < data.length &&
        currentHeight + (measuredHeights[startIndex] || estimatedItemHeight) <
          scrollTop
      ) {
        currentHeight += measuredHeights[startIndex] || estimatedItemHeight;
        startIndex++;
      }

      startIndex = Math.max(0, startIndex - bufferSize);
      let endIndex = startIndex;
      let visibleHeight = 0;

      // 计算结束索引
      while (
        endIndex < data.length &&
        visibleHeight < containerHeight + bufferSize * estimatedItemHeight
      ) {
        visibleHeight += measuredHeights[endIndex] || estimatedItemHeight;
        endIndex++;
      }

      endIndex = Math.min(data.length - 1, endIndex + bufferSize);

      return {
        startIndex,
        endIndex,
        visibleData: data.slice(startIndex, endIndex + 1),
      };
    }
  }, [
    data,
    scrollTop,
    containerHeight,
    itemHeight,
    measuredHeights,
    estimatedItemHeight,
    bufferSize,
  ]);

  // 测量元素高度
  const measureRef = (index: number, element: HTMLElement | null) => {
    if (element && !itemHeight) {
      const actualHeight = element.getBoundingClientRect().height;
      if (measuredHeights[index] !== actualHeight) {
        setMeasuredHeights((prev) => ({
          ...prev,
          [index]: actualHeight,
        }));
      }
    }
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    scrollTop,
    setScrollTop,
    totalHeight,
    startIndex,
    endIndex,
    visibleData,
    measureRef,
    onScroll,
  };
};
