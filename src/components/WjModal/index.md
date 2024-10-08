---
title: MsModal - 弹窗
toc: content
group:
  title: 反馈
  order: 5
order: 1
demo:
  cols: 2
---

# MsModal - 弹窗

MsModal 组件的主要目的是为了实现代码逻辑的模块化与解耦，使用场景和 Antd Modal 保持一致。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 MsModal 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用 [MsConfirm](/components/ms-confirm)。


## 代码演示



:::info{title=使用规范}
统一使用 MsModal.open 方式，弹窗都要抽离成单独的组件，组件命名规则遵循：**XxxModal**
:::
<code src="./__demo__/base.tsx"></code>

<code src="./__demo__/devopsModal.tsx"></code>


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发打开弹窗的元素 | `ReactNode` | - |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | false |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | `boolean` | true |
| okText | 确认按钮文案 | `ReactNode` | 确定 |
| okButtonProps | ok 按钮 props | `ButtonProps` | - |
| onOk | 点击确定回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| cancelText | 取消按钮文案 | `ReactNode` | 取消 |
| cancelButtonProps | cancel 按钮 props | `ReactNode` | - |
| onCancel | 点击左上角叉或取消按钮的回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| <a href="https://4x.ant.design/components/modal-cn/#API" target="_blank" >...ModalProps</a> | 继承 Antd Modal | - |

### create

创建一个可以用 `MsModal.open` 打开的弹窗组件，create 接受一个自定义弹窗组件，返回一个可用于 `MsModal.open` 调用的组件，自定义弹窗组件的参数将作为函数调用的参数。

**重点**：必须在自定义弹窗组件实现 `MsModal.useModal` 并将返回的 `modal.props` 与 `MsModal` 组件绑定，才能实现 `MsModal.open` 的调用。

```tsx | pure
const MyModal = MsModal.create((props: { title: string }) => {
  const { title } = props;
  const modal = MsModal.useModal();

  return (
    <MsModal {...modal.props} title={title} />
  );
})

MsModal.open(MyModal, {title: "传递参数"});

```

### useModal
#### Result

| 参数    | 说明     | 类型                          |
| ------- | -------- | ----------------------------- |
|props|弹窗参数，将它传给`MsModal`组件，然后用下面的方法可以控制弹窗| [MsModalProps](/components/ms-modal#api) |
|open|打开弹窗|`(args?: Props) => Promise`|
|close|关闭弹窗|`() => Promise`|
|destroy|销毁弹窗|`() => void`|
|resolve|将弹窗看作Promise，将状态改为成功，并将 args 参数传递出去|`(args) => void`|
|reject|将弹窗看作Promise，将状态改为失败，并将 args 参数传递出去|`(args) => void`|

