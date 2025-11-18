/**
 * title: 基本使用
 * description:
 */
import { setField, WjField, WjRichText } from 'magical-antd-ui';

setField('richText', WjRichText);

export default () => {
  return (
    <>
      <WjField valueType="richText" />
    </>
  );
};
