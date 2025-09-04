import { Modal } from 'antd';
import { omit } from 'lodash-es';
import type { ComponentType } from 'react';
import NiceModal, { antdModal, useModal } from '../NiceModal';
import { useOpen } from './hooks';
import InternalMsModal from './modal';
import type { MsModalProps } from './type.d';
import OpenModal from './utils/OpenModal';

export type { MsModalProps };

type MsModalHandler<Props = Record<string, unknown>> = {
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

declare function UseModalFC(): MsModalHandler;
// eslint-disable-next-line @typescript-eslint/unified-signatures
declare function UseModalFC(modal: string, args?: any): MsModalHandler;

type MsModalComponent = ComponentType<Omit<MsModalProps, 'useModal'>> & {
  useOpen: typeof useOpen;
  create: typeof NiceModal.create;
  useModal: typeof UseModalFC;
  open: typeof NiceModal.show;
  close: typeof NiceModal.hide;
  destroy: typeof NiceModal.remove;
  OpenModal: typeof OpenModal;
} & typeof Modal;

const WjModal = InternalMsModal as unknown as MsModalComponent;

WjModal.useOpen = useOpen;
WjModal.useModal = ((...props: any) => {
  const modal = (useModal as any).apply(props);
  const modalProps = antdModal(modal);
  const onClose = modalProps.onCancel;
  modal.props = { ...omit(modalProps, 'onCancel'), onClose };
  modal.open = modal.show;
  modal.close = modal.hide;
  modal.destroy = modal.remove;
  return modal;
}) as any;

WjModal.info = Modal.info;
WjModal.success = Modal.success;
WjModal.warning = Modal.warning;
WjModal.error = Modal.error;
WjModal.destroyAll = Modal.destroyAll;
WjModal.OpenModal = OpenModal;

WjModal.create = NiceModal.create;
WjModal.open = NiceModal.show;
WjModal.close = NiceModal.hide;
WjModal.destroy = NiceModal.remove;

export default WjModal;

{
  /* <code src="./__demo__/promise.tsx"></code>

<code src="./__demo__/info.tsx"></code>

<code src="./__demo__/button.tsx"></code>
<code src="./__demo__/footer.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/loading.tsx"></code> 
<code src="./__demo__/debug.tsx"></code>*/
}
