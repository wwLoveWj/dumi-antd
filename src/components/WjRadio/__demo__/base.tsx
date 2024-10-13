import { WjRadio } from 'magical-antd-ui';
import React, { useState } from 'react';
export default function Base() {
  const [selectedValue, setSelectedValue] = useState('a');
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  //   useEffect(() => {
  //     const primaryColor = document.documentElement.dataset.primaryColor;
  //     const secondaryColor = document.documentElement.dataset.secondaryColor;

  //     // 存储颜色值到全局变量
  //     (window as any).__COLOR_VARS__ = {
  //       primaryColor,
  //       secondaryColor,
  //     };
  //   }, []);
  return (
    <div data-primary-color="#1a73e8" data-secondary-color="#f5f5f5">
      <WjRadio
        value={selectedValue}
        onChange={handleRadioChange}
        configuration={{
          colorRadio: 'red',
          mode: 'block',
          jumpX: '3em',
          jumpY: '-1.5em',
          widthRadio: '10em',
          //   '--tranlateX': '6.65em',
          //   '--tranlateY': '-2.5em',
        }}
      />
    </div>
  );
}
