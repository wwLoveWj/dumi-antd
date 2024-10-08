/*
 * @Description:
 * @Date: 2023-02-14 15:45:31
 * @LastEditTime: 2023-02-14 17:37:25
 */
import { useUnmount } from 'ahooks';
import { message, notification } from 'antd';
import type { FC } from 'react';
import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider as NiceModalProvider } from '../NiceModal';

import type { MsConfigPropsType, MsConfigType } from './type.d';

// import useSentry from './useSentry';

const MsConfigContext = createContext<MsConfigType>({});

const { Provider, Consumer } = MsConfigContext;

const MsConfigProvider: FC<MsConfigPropsType> = (props) => {
  const {
    children,
    iconScriptUrl,
    // sentryInfo = {}
  } = props;
  //   useSentry(sentryInfo);

  // 切换微应用，销毁提示组件
  useUnmount(() => {
    notification.destroy();
    message.destroy();
  });

  return (
    <Provider value={{ iconScriptUrl }}>
      <NiceModalProvider> {children ? children : <Outlet />}</NiceModalProvider>
    </Provider>
  );
};

export { MsConfigProvider, Consumer as MsConfigConsumer, MsConfigContext };

export default MsConfigProvider;
