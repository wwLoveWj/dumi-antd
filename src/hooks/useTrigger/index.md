---
title: useTrigger
toc: content
debug: true
group:
  title: hooks
  order: 20000
---

# useTrigger

让 `modal/drawer` 这类需要设置 `open` 开关状态的组件，支持以 `trigger` 方式开关。

## 何时使用

一般用于需要开关类的组件封装，简化封装后组件调用开关的代码

## 代码演示

<code src="./__demo__/trigger.tsx"></code>

<code src="./__demo__/open.tsx"></code>

## API

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ... | 要封装的组件 props | `Record<string, any>` | - |
| ...[TriggerProps](#TriggerProps) | 组件 props 继承的 TriggerProps 属性（如下） | `TriggerProps` | - |

### TriggerProps

| 参数    | 说明                              | 类型              | 默认值 |
| ------- | --------------------------------- | ----------------- | ------ |
| trigger | trigger 方式，触发开关的 dom 元素 | `React.ReactNode` | -      |
| open    | open 方式，控制开关的状态         | `boolean`         | -      |
| onClose | open 方式，关闭开关的回调         | `() => void`      | -      |
