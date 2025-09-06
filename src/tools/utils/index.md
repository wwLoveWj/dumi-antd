---
category: Tools
title: calcTextWidth 计算文本宽度 # 组件的标题，会在菜单侧边栏展示
toc: content # 在页面右侧展示锚点链接
group: # 分组
  title: 计算文本宽度 # 所在分组的名称
  order: 1 # 分组排序，值越小越靠前
---

# calcTextWidth 计算文本宽度

## 介绍

如何计算文本宽度，一般用在判断...省略号的出现时机

## 示例

<!-- 可以通过code加载示例代码，dumi会帮我们做解析 -->

```js
calcTextWidth('计算本文宽度1');
calcTextWidth('计算本文宽度2', '16px');
calcTextWidth('计算本文宽度3', '16px', true);
```
<!-- <code src="./__demo__/base.tsx">基础用法</code> -->

## API

<!-- 会生成api表格 -->

| 属性 | 类型      | 默认值    | 必填     | 说明  |
| ---- | --------- | --------- | -------- | ----- |
| str | `string` | `""` | `false` | 文本 |
| fontSize | `string` | `12px` | `false` | 字体大小 |
| removeNode | `boolean` | `false` | `false` | 根据removeNode决定是否移除节点 |
