import type { ComponentType } from 'react';
import NiceModal, { antdDrawerV5, useModal } from '../NiceModal';
import InternalMsModal from './drawer';
import { useOpen } from './hooks';
import type { WjDrawerProps } from './types';

type MsDrawerHandler<Props = Record<string, unknown>> = {
  props: {
    open: boolean;
    onCancel: () => Promise<any>;
    onOk: () => Promise<any>;
    afterClose: () => void;
  };
  open: (args?: Props) => Promise<unknown>;
  close: () => Promise<unknown>;
  destroy: () => void;
  resolve: (args?: unknown) => void;
  reject: (args?: unknown) => void;
};

declare function UseDrawerFC(): MsDrawerHandler;
// eslint-disable-next-line @typescript-eslint/unified-signatures
declare function UseDrawerFC(modal: string, args?: any): MsDrawerHandler;

export type { WjDrawerProps };

type MsDrawerComponent = ComponentType<WjDrawerProps> & {
  useOpen: typeof useOpen;
  useDrawer: typeof UseDrawerFC;
  create: typeof NiceModal.create;
  open: typeof NiceModal.show;
  close: typeof NiceModal.hide;
  destroy: typeof NiceModal.remove;
};

const WjDrawer = InternalMsModal as unknown as MsDrawerComponent;

WjDrawer.useOpen = useOpen;

WjDrawer.useDrawer = ((...props: any) => {
  const drawer = (useModal as any).apply(props);
  drawer.props = antdDrawerV5(drawer);
  drawer.open = drawer.show;
  drawer.close = drawer.hide;
  drawer.destroy = drawer.remove;
  return drawer;
}) as any;

WjDrawer.create = NiceModal.create;
WjDrawer.open = NiceModal.show;
WjDrawer.close = NiceModal.hide;
WjDrawer.destroy = NiceModal.remove;

export default WjDrawer;
