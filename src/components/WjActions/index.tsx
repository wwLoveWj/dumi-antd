import type { ComponentType } from 'react';
import WjActionButton from '../WjActionButton';
import Actions from './actions';
import type { WjActionsProps } from './type.d';

type MsActionsComponent = ComponentType<WjActionsProps> & {
  Button: typeof WjActionButton;
};

const WjActions = Actions as MsActionsComponent;

WjActions.Button = WjActionButton;

export default WjActions;

export type { ItemsProps, WjActionsProps } from './type.d';
