// components/VirtualTable.tsx
import { Table, TableProps } from 'antd';
import { useRef } from 'react';
import { useVirtualScroll } from '../../hooks/useVirtualScrollOptimized';

interface VirtualTableProps<T> extends TableProps<T> {
  height: number;
  itemHeight?: number; // 定高模式
  estimatedItemHeight?: number; // 不定高模式预估高度
  bufferSize?: number;
}

const VirtualTable = <T extends object>({
  dataSource = [],
  height,
  itemHeight,
  estimatedItemHeight = 55,
  bufferSize = 5,
  components,
  ...tableProps
}: VirtualTableProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { totalHeight, startIndex, visibleData, measureRef, onScroll } =
    useVirtualScroll(dataSource, {
      containerHeight: height,
      itemHeight,
      estimatedItemHeight,
      bufferSize,
    });

  // 自定义表格组件
  const virtualComponents: TableProps<T>['components'] = {
    body: {
      wrapper: (props: any) => (
        <div
          ref={containerRef}
          style={{
            height: height,
            overflow: 'auto',
            position: 'relative',
          }}
          onScroll={onScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            {props.children}
          </div>
        </div>
      ),
      row: (props: any) => {
        const { 'data-row-key': rowKey, ...restProps } = props;
        const actualIndex = parseInt(rowKey, 10);

        return (
          <tr
            {...restProps}
            ref={(el) => measureRef(actualIndex, el)}
            style={{
              ...restProps.style,
              transform: `translateY(${getOffset(actualIndex)}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
            }}
          />
        );
      },
    },
    ...components,
  };

  // 计算行偏移量
  const getOffset = (index: number) => {
    if (itemHeight) {
      // 定高模式
      return index * itemHeight;
    } else {
      // 不定高模式 - 这里需要计算之前所有行的累计高度
      // 在实际项目中，你可能需要维护一个位置缓存
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += measuredHeights[i] || estimatedItemHeight;
      }
      return offset;
    }
  };

  return (
    <Table<T>
      {...tableProps}
      dataSource={visibleData.map((item, index) => ({
        ...item,
        key: startIndex + index, // 保持正确的索引
      }))}
      components={virtualComponents}
      pagination={false}
    />
  );
};

export default VirtualTable;
