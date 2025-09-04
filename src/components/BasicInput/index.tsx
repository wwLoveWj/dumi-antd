import React, { memo } from 'react';
import './styles/index.less'; // 引入样式

interface InputProps {
  labelText: string; //输入框placeholder
  InputType: string;
  required: boolean;
  maxWidth: number | string;
  lineColor: string;
}
/** 按钮组件 */
const WjBasicInput: React.FC<InputProps> = (props) => {
  const {
    labelText,
    InputType = 'text',
    required = true,
    maxWidth = 300,
    lineColor = 'blue',
  } = props;
  return (
    <div
      className="form-item"
      style={{ width: `${maxWidth}px`, marginBottom: '20px' }}
    >
      <input type={InputType} id="username" required={required} />
      <span className="line" style={{ borderBottomColor: lineColor }}></span>
      <label htmlFor={labelText}>{labelText}</label>
    </div>
  );
};

export default memo(WjBasicInput);
