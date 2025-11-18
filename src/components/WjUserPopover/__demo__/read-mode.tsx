/**
 * title: 只读模式
 * description:
 */

import { WjField } from 'magical-antd-ui';
import { userListData } from './userListData';

const hoverDataRequest = (data: Record<string, any>) => {
  const hoverUserData = userListData.find((item) => item.value === data?.value);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 200, data: hoverUserData });
    }, 500);
  });
};

export default () => {
  return (
    <>
      <WjField
        valueType="userPopover"
        mode="read"
        fieldProps={{
          defaultValue: userListData.slice(0, 2),
          hoverRequest: hoverDataRequest,
          frequentContactsKey: 'userPopover',
        }}
      />
    </>
  );
};
