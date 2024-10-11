---
title: WjDrawer - 抽屉
toc: content
order: 2
group:
  title: 反馈
  order: 5
demo:
  cols: 2
---

# WjDrawer - 抽屉

WjDrawer 组件的主要目的是为了实现代码逻辑的模块化与解耦，新增底部确认和取消按钮与MsModal保持统一，使用场景和 Antd Drawer 保持一致。


## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。



## 代码演示

:::info{title=使用规范}
统一使用 WjDrawer.open 方式，抽屉都要抽离成单独的组件，组件命名规则遵循：**XxxDrawer**
:::
<code src="./__demo__/debug.tsx"></code>

<code src="./__demo__/base.tsx"></code>

<code src="./__demo__/promise.tsx"></code>

<code src="./__demo__/size.tsx"></code>

<code src="./__demo__/loading.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发打开抽屉的元素 | `ReactNode` | - |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | false |
| destroyOnClose | 关闭时销毁 WjDrawer 里的子元素 | `boolean` | true |
| okText | 确认按钮文案 | `ReactNode` | 确定 |
| okButtonProps | ok 按钮 props | `ButtonProps` | - |
| onOk | 点击确定回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| cancelText | 取消按钮文案 | `ReactNode` | 取消 |
| cancelButtonProps | cancel 按钮 props | `ReactNode` | - | 
| onCancel | 点击左上角叉或取消按钮的回调，异步函数有 loading 效果 | `() => Promise<any>` | - |
| [...WjDrawerProps](https://4x.ant.design/components/drawer-cn/#API) | 继承 Antd Drawer | - |


### create

创建一个可以用 `WjDrawer.open` 打开的抽屉组件，create 接受一个自定义抽屉组件，返回一个可用于 `WjDrawer.open` 调用的组件，自定义抽屉组件的参数将作为函数调用的参数。

**重点**：必须在自定义抽屉组件实现 `WjDrawer.useDrawer` 并将返回的 `drawer.props` 与 `WjDrawer` 组件绑定，才能实现 `WjDrawer.open` 的调用。

```tsx | pure
const MyDrawer = WjDrawer.create((props: { title: string }) => {
  const { title } = props;
  const drawer = WjDrawer.useDrawer();

  return (
    <WjDrawer {...drawer.props} title={title} />
  );
})

WjDrawer.open(MyDrawer, {title: "传递参数"});

```

### useDrawer
#### Result

| 参数    | 说明     | 类型                          |
| ------- | -------- | ----------------------------- |
|props|抽屉参数，将它传给`WjDrawer`组件，然后用下面的方法可以控制抽屉| [WjDrawerProps](/components/WjDrawer#api) |
|open|打开抽屉|`(args?: Props) => Promise`|
|close|关闭抽屉|`() => Promise`|
|destroy|销毁抽屉|`() => void`|
|resolve|将抽屉看作Promise，将状态改为成功，并将 args 参数传递出去|`(args) => void`|
|reject|将抽屉看作Promise，将状态改为失败，并将 args 参数传递出去|`(args) => void`|
