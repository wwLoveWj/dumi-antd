---
title: WjActions - 操作按钮
toc: content
group:
  title: 操作
  order: 6
cover: https://cdn.jsdelivr.net/gh/wwLoveWj/Picture-bed@imgs/images/202509061248242.png
demo:
  cols: 2
---

# WjActions - 操作按钮

## 何时使用

WjActions：表格的操作列，表格批量操作按钮。

WjActions.Button: 根据业务场景选择性使用。

## 代码演示

<code src="./__demo__/basic.tsx"></code>
<code src="./__demo__/button.tsx"></code>

<code src="./__demo__/type.tsx"></code>

<code src="./__demo__/disable.tsx"></code>

<code src="./__demo__/nesting.tsx"></code>

<!-- <code src="./__demo__/table.tsx"></code> -->

## WjActions

| 参数        | 说明                                             | 类型             | 默认值 |
| ----------- | ------------------------------------------------ | ---------------- | ------ |
| limit       | 菜单显示几个按钮，其他放入更多 ，传入-1 显示全部 | `number`         | 2      |
| actionsType | 内置默认样式                                     | `button \| link` | link   |
| items       | >=2.0.0 可用                                     | `ItemsProps[]`   | -      |
| ellipsis     | 使用...来表示替换更多文案（依据最新设计规范），>=2.19.0 可用                                     | `boolean`   | `false`      |

### ItemsProps

| 参数     | 说明                                    | 类型                         | 默认值 |
| -------- | --------------------------------------- | ---------------------------- | ------ |
| label    | 菜单数据                                | `ReactNode`                  | -      |
| onClick  | 单击事件                                | `() => void`                 | -      |
| disabled | 是否禁用                                | `boolean \| DisabledProps[]` | -      |
| content  | 禁用文本，disabled=true 可用            | `ReactNode`                  | -      |
| items    | >=2.7.8 可用，配置嵌套, 目前只支持 2 层 | `ItemsProps[]`               | -      |

### DisabledProps

| 参数     | 说明     | 类型        | 默认值 |
| -------- | -------- | ----------- | ------ |
| disabled | 是否禁用 | `boolean`   | -      |
| content  | 禁用文本 | `ReactNode` | -      |

## WjActionsButton

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮文本 | `ReactNode` | - |
| popover | 按钮提示透传 | `PopoverProps` | - |
| disabled | 是否禁用 | `boolean` | - |
| content | 禁用文本,disabled=true 可用 | `ReactNode` | - |
| [...ButtonProps](https://4x.ant.design/components/button-cn/#API) | 继承 antd Button 属性 | `ButtonProps` | - |
