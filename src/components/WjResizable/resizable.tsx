// resizable.tsx
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { isBoolean, isObject } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import './index.less';
import type { WjResizablePorps } from './types.ts';

const WjResizable = (props: WjResizablePorps) => {
  const {
    min,
    max,
    open: _open = true,
    height: _height = '',
    style = {},
    contentWrapperStyle = {},
    className,
    width: defaultWidth,
    disabled = false,
    children,
    scroll = true,
    showCollapsedToggle = true,
    expandStyle = {},
  } = props;
  // 定义一个正则表达式来验证高度值
  const validHeightRegex = /^(?:\d+(px)|\d+(\.\d+)?%)$/;
  // 最小宽度
  const minW = typeof min === 'number' ? min : 200; // + 12;
  // 最大宽度
  const maxW = typeof max === 'number' ? max : 500; // + 12;
  // 初始宽度
  const w = typeof defaultWidth === 'number' ? defaultWidth : minW;
  // 设置容器的样式

  const maxWidth = minW > maxW ? minW : maxW;
  const _width = minW > w ? minW : maxW < w ? maxW : w;

  // 设置高度  默认是100%
  let height;
  if (typeof _height === 'number') {
    height = `${_height}px`;
  } else if (validHeightRegex.test(_height)) {
    height = _height;
  } else {
    height = '100%';
  }

  const [width, setWidth] = useControllableValue<number>(props, {
    valuePropName: 'defaultWidth',
    defaultValue: _width,
  });

  const [open, setOpen] = useControllableValue<boolean>(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
    defaultValue: _open,
  });

  // 设置滚动
  const overflow = useMemo(() => {
    if (isBoolean(scroll)) {
      if (scroll) {
        return open ? 'auto' : 'hideen auto';
      } else {
        return open ? 'auto hideen' : 'hideen';
      }
    } else if (isObject(scroll)) {
      const { x = false, y = false } = scroll ?? {};
      return [
        x ? 'auto' : open ? 'auto' : 'hidden',
        y ? 'auto' : 'hidden',
      ].join(' ');
    }
  }, [scroll, open]);

  const initialXRef = useRef<number>(0);
  const resizableRef = useRef<HTMLDivElement>(null);
  const resizHandleRef = useRef<HTMLDivElement>(null);

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (resizableRef?.current) {
        const newWidth = Math.min(
          Math.max(
            e.clientX - resizableRef.current.getBoundingClientRect().left,
            minW,
          ),
          maxWidth,
        );
        setWidth(newWidth);
      }
    },
    [maxWidth, minW, setWidth],
  );

  const handleResizeEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    if (resizableRef?.current) {
      resizableRef.current.style.transitionDuration = '0.25s';
    }
    if (resizHandleRef.current) {
      resizHandleRef.current.style.borderLeft = '1px solid #e6e8eb';
    }
  }, [handleResizeMove]);

  const handleResizeStart = (e: React.MouseEvent) => {
    // 关闭后不允许拖动
    if (!open || disabled) return false;
    e.preventDefault();
    initialXRef.current = e.clientX;
    if (resizableRef.current) {
      resizableRef.current.style.transition = '0s';
    }
    if (resizHandleRef.current) {
      resizHandleRef.current.style.borderLeft = '1px dashed #106ffb';
    }
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [handleResizeEnd, handleResizeMove]);

  return (
    <div
      ref={resizableRef}
      style={{ ...style, width: open ? width : 0 }}
      className={['ms-resizable', className].join(' ')}
    >
      <div
        className="ms-resizable-content"
        style={{ height, ...contentWrapperStyle, overflow }}
      >
        {children}
      </div>
      <div
        ref={resizHandleRef}
        className="ms-resizable-handle"
        style={{
          cursor: disabled || !open ? 'default' : 'ew-resize',
          // borderColor: disabled ? 'transparent' : '#e6e8eb',
        }}
        onMouseDown={handleResizeStart}
      />
      {showCollapsedToggle && (
        <div
          className="ms-resizable-trapezoid"
          onClick={() => setOpen((p) => !p)}
          style={{
            ...expandStyle,
            top: expandStyle?.top ? `calc(${expandStyle.top} + 20px)` : '40%',
          }}
        >
          {open ? <LeftOutlined /> : <RightOutlined />}
        </div>
      )}
    </div>
  );
};

export default WjResizable;
