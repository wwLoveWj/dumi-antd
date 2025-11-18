import type { IButtonMenu, IDomEditor } from '@wangeditor/editor';
import type { RichTextProps } from '../types';
import { showToolbarMenu } from './showMenuByEditor';

const editMenu: (props?: RichTextProps) => IButtonMenu = (
  props?: RichTextProps,
) => {
  const { editText } = props ?? {};
  return {
    title: '编辑',
    tag: editText ?? 'button',
    alwaysEnable: true,
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(): string | boolean {
      return '';
    },

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(): boolean {
      return false;
    },

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(): boolean {
      return false;
    },

    // 点击菜单时触发的函数
    exec(editor: IDomEditor) {
      if (editor === null) return;
      editor.enable();
      showToolbarMenu(editor, 'ms-edit', false);
      showToolbarMenu(editor, 'ms-cancel', true);
    },
  };
};

const cancelMenu: (props?: RichTextProps) => IButtonMenu = (
  props?: RichTextProps,
) => {
  const { cancelText, onCancel } = props ?? {};
  return {
    title: cancelText ?? '取消',
    tag: 'button',
    alwaysEnable: true,
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(): string | boolean {
      return '';
    },

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(): boolean {
      return false;
    },

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(): boolean {
      return false;
    },

    // 点击菜单时触发的函数
    exec(editor: IDomEditor) {
      if (editor === null) return;
      editor.disable();
      onCancel?.(editor.getHtml());
      showToolbarMenu(editor, 'ms-edit', true);
      showToolbarMenu(editor, 'ms-cancel', false);
    },
  };
};
export { cancelMenu, editMenu };
