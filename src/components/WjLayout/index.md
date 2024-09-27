---
category: Components
title: WjLayout # 组件的标题，会在菜单侧边栏展示
toc: content # 在页面右侧展示锚点链接
group: # 分组
  title: 基础组件 # 所在分组的名称
  order: 2 # 分组排序，值越小越靠前
---

## 梳理

layout组件必定是由一个或多个组件组成，所以layout组件的代码逻辑应该在layout组件内部，而不是在layout组件外部。
左侧菜单组件和顶部导航组件应该由layout组件内部渲染，而不是由layout组件外部渲染。
由此我们需要编写封装Menu菜单组件和Breadcrumb面包屑组件，并封装进去，防止多个项目重复封装。

### 封装要注意的点

1. 可扩展性
2. 可复用性
3. 持续发展
4. 方便快捷
5. 简单易用
6. 不要只考虑开发的简便性，而要注重使用的便捷性

## 演示

<code src="./__demo__/base.tsx">基本用法</code>

## API
![666](https://cdn.jsdelivr.net/gh/wwLoveWj/Picture-bed@imgs/images/202409251651190.jfif)
<API></API>
