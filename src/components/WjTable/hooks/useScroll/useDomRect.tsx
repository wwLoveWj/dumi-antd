import { useEventListener, useUpdateEffect } from 'ahooks';
import { debounce } from 'lodash-es';
import { useRef, useState } from 'react';

/**
 * 获取元素相对于浏览器视窗上下左右的位置
 * @param target
 * @returns
 */
const useDomRect = (
  target: HTMLElement | null,
  deps: any[] = [],
): [DOMRect | null, { width: number; height: number } | null] => {
  const [domRect, setDomRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const isTargetVisible = useRef(false);

  const update = debounce(() => {
    if (target) {
      setDomRect(target.getBoundingClientRect());
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
  }, 50);

  if (!isTargetVisible.current) {
    update();
    if (target) isTargetVisible.current = true;
  }

  useEventListener('resize', () => update());

  useUpdateEffect(() => update(), deps);

  return [domRect, viewport];
};

export default useDomRect;
