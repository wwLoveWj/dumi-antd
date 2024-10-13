import React from 'react';
import './style.scss';

export interface RadioOptionType {
  label: string;
  value: string;
}
export default function WjRadio({
  options = [
    {
      label: 'A',
      value: 'a',
    },
    {
      label: 'B',
      value: 'b',
    },
    {
      label: 'C',
      value: 'c',
    },
  ],
  /**
   * 当前选中的值
   */
  value,
  onChange,
  labelWidth = 200,
  configuration = {
    colorRadio: '#255ff4',
    jumpX: '6.65em',
    jumpY: '-2.5em',
    mode: 'flex',
  },
}: {
  options?: RadioOptionType[];
  value: string;
  onChange: (value: string) => void;
  styles?: Record<string, string>;
  labelWidth?: string | number;
  configuration?: {
    /**
     * 颜色
     */
    colorRadio?: string;
    /**
     * 横向偏移量
     */
    jumpX?: string;
    /**
     * 纵向偏移量
     */
    jumpY?: string;
    mode?: 'flex' | 'block';
    widthRadio?: string;
  };
}) {
  return (
    <div
      className="wj-radio"
      style={
        {
          '--colorRadio': configuration?.colorRadio || '#255ff4',
          '--jumpLen': configuration?.jumpX || '6.65em',
          '--tranlateY': configuration?.jumpY || '-2.5em',
          '--mode': configuration?.mode || 'flex',
          '--width': configuration?.widthRadio || '20em',
          //   '--jumpDir':
          //     configuration?.mode === 'flex'
          //       ? `translateY(${configuration?.jumpY || '-2.5em'})`
          //       : `translateX(${configuration?.jumpY || '-1.5em'})`,
          //   '--jumpDirInit':
          //     configuration?.mode === 'flex' ? 'translateY(0)' : 'translateX(0)',
          ...(configuration || {}),
        } as Record<string, string>
      }
    >
      <form>
        {options?.map((item) => (
          <>
            <input
              type="radio"
              id={item.value}
              name="hopping"
              value={item.value}
              onChange={(e) => {
                onChange(e.target.value); // 当改变时，传递新的值给父组件
              }}
              checked={item.value === value}
            />
            <label htmlFor={item.value} style={{ width: labelWidth }}>
              <span></span>
              {item.label}
            </label>
          </>
        ))}
        <div className="worm">
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
          <div className="worm__segment"></div>
        </div>
      </form>
    </div>
  );
}
