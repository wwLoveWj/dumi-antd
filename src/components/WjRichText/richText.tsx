import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
// import enhanceField from '../enhanceField';
import type { MsRichTextProps, MsRichTextRef } from './types';
import RichText from './WichText/index';

const WjRichText = forwardRef((props: MsRichTextProps, ref: MsRichTextRef) => {
  const { fieldProps } = props;

  const editDom = <RichText ref={ref} {...fieldProps} />;

  const readDom = (
    <RichText ref={ref} toolbar={false} readOnly={true} {...fieldProps} />
  );

  return useModeRender(props, editDom, readDom);
});

export default WjRichText;
