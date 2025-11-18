import { forwardRef } from 'react';
import { SchemaRender } from 'react-schema-render';

import type { MsFieldComponentType, WjFieldProps } from './types';

/**
 * MsField 组件，通过 valueType 动态渲染任意 field 组件，它的参数结构和 column 配置接近，是在 column 基础上做的删减
 */
const WjField = forwardRef((props: WjFieldProps<any>, ref: any) => {
  const { valueType = 'text', ...restProps } = props;

  const schema = { component: valueType, valueType, ref, ...restProps };

  return <SchemaRender schema={schema} />;
}) as MsFieldComponentType;

export default WjField;
