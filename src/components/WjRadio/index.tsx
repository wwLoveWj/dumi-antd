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
  styles = {
    '--colorRadio': '#255ff4',
    '--tranlateX': '6.65em',
    '--tranlateY': '-2.5em',
  },
}: {
  options?: RadioOptionType[];
  value: string;
  onChange: (value: string) => void;
  styles?: Record<string, string>;
  labelWidth?: string | number;
}) {
  return (
    <div className="wj-radio" style={styles}>
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
