import { WjRadio } from 'magical-antd-ui';
import React, { useState } from 'react';
export default function Base() {
  const [selectedValue, setSelectedValue] = useState('a');
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div>
      <WjRadio value={selectedValue} onChange={handleRadioChange} />
    </div>
  );
}
