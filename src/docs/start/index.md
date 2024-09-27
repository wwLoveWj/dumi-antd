---
title: 快速开始
order: 1
---

# Antd-Wj

Antd-Wj 是基于 Ant Design 而封装的一些业务模板组件，根据工作中实际业务场景提供更高级别的抽象，开箱即用。

- <a href="/components/wj-layout" >WjLayout</a> 解决布局的问题，提供开箱即用的菜单和面包屑功能
- <a href="/components/wj-table">WjTable</a> 表格模板组件，抽象网络请求和表格格式化
- <a href="/components/wj-form">WjForm</a> 表单模板组件，预设常见布局和行为

在使用之前可以查看一下典型的 Demo 来判断组件是否适合你的业务。

## npm 镜像仓库

`magical-antd-ui` 发布到了公有的 npm 上，访问不了的需要先设置 npm 的私有镜像

```shell
npm config set registry https://registry.npmjs.com/
# or
yarn config set registry https://registry.npmjs.com/
```

## 前置依赖

请先检查项目中是否已安装以下依赖

```
"react": ">=16.9.0",
"react-dom": ">=16.9.0",
"antd": ">=4.24.0"
```

## 安装

`magical-antd-ui@25.x` 是基于 `antd@4.x` 开发的，目前还不支持 `antd@5.x`

```shell
npm install magical-antd-ui
# or
yarn add magical-antd-ui
```

## 配置

要注意以下两点：

1. 需要单独引入 antd 样式

```css
/** global.less */
@import '~antd/dist/antd.less';
```

2. 要确保 antd 样式在 antd-wj 组件之前引入

```js
// app.tsx
import './global.less';
// 这里空一行，
```

## 在项目中使用

```tsx
import { Button } from 'magical-antd-ui';

export default () => {
  return <Button type="default">默认按钮</Button>;
};
```
