import type { ModalFuncProps } from 'antd';

type confirmType = ModalFuncProps & {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
};

export type modalFunType = (confirm: confirmType) => unknown;
type ModalFunction = (
  options: ModalFuncProps & {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  },
) => void;
const OpenModal = (
  modalFun: ModalFunction,
  props: ModalFuncProps,
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      // 确保 modalFun 是一个函数
      if (typeof modalFun !== 'function') {
        throw new Error('modalFun must be a function');
      }

      // 调用 modalFun 并传递参数
      modalFun({ ...props, resolve, reject });
    } catch (error) {
      // 处理 modalFun 内部抛出的异常
      reject(error);
    }
  });
};

export default OpenModal;
