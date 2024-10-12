import React from 'react';
import './style.scss';
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
}: {
  options?: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
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
          <label htmlFor={item.value}>
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
  );
}
