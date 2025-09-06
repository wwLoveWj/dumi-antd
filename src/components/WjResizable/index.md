---
title: WjResizable - 拖动容器宽度
description: 用于实现界面容器拖动调整大小。
toc: content
order: 3
cover: https://cdn.jsdelivr.net/gh/wwLoveWj/Picture-bed@imgs/images/202509061212539.png
group:
  title: 布局
version: 2.19.0
---

## 何时使用

- 用户可以在项目管理工具中，调整任务列表与详细视图之间的宽度，优化工作流程中的信息展示。
- 开发者可以通过拖动调整代码编辑区与文件浏览器之间的宽度比例，以便更好地查看和编辑代码。
- 在展示大量数据的数据表格中，用户可以根据自己的需求调整列宽，使重要信息更加清晰可见。

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/disabled.tsx"></code>

<code src="./__demo__/set-width.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否展开 | `boolean` | `true` |
| min | 最小拖动宽度 | `number` | `200` |
| max | 最大拖动宽度 | `number` | `500` |
| style | css 样式 | `CSSProperties` | `{}` |
| contentWrapperStyle | 容器 css 样式 | `CSSProperties` | `{}` |
| height | 容器高度 | `ValidHeight` | `100%` |
| className | 容器 classname | `string` | ` ` |
| width | 初始化宽度(不传默认为 min 的值) | `number` | ` ` |
| disabled | 是否可以拖动 | `boolean` | `false` |
| onChange | 返回当前容器的宽度 | `(width: number) => void` | ` ` |
| onOpenChange | 容器打开关闭回调 | `(open: boolean) => void` | ` ` |
| showCollapsedToggle | 是否显示折叠按钮 | `boolean` | ` ` |
| scroll | 控制 X,Y 是否滚动 | `boolean \| { x?: boolean; y?: boolean }` | `true ` |
| expandStyle | 展开收起按钮的容器样式 | `CSSProperties` | `{}` |
