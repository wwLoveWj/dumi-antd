---
category: Components
title: NotFound 页面 # 组件的标题，会在菜单侧边栏展示
toc: content # 在页面右侧展示锚点链接
group: # 分组
  title: 404组件 # 所在分组的名称
  order: 5 # 分组排序，值越小越靠前
---

# NotFound 页面

## 介绍

基础的404组件 NotFound。

## 示例

<!-- 可以通过code加载示例代码，dumi会帮我们做解析 -->


<code src="./__demo__/base.tsx">基础用法</code>

## APi

<!-- 会生成api表格 -->

| 属性 | 类型      | 默认值    | 必填     | 说明  |
| ---- | --------- | --------- | -------- | ----- |
| placeholder | `string` |`404`| `false` | 页面标题 |
| handleOpenLogin | `any` |`-`| `false` | 页面按钮操作 |
| screen | `any` |`-`| `false` | 屏幕显示的dom元素 |

### 注意

使用时需要用一个元素包裹，并且给该元素定义classname，必须加上样式

```bash
position: relative;
```
