import React, { useContext } from 'react';
import type { MsInModalDrawerContext } from '../type.d';

export const InModalDrawerContext = React.createContext<MsInModalDrawerContext>(
  {
    inContext: false,
  },
);

export const useInModalDrawer = () => useContext(InModalDrawerContext);
