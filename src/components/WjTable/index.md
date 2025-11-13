---
title: WjTable - 通用表格
description: 用于实现表单表格数据交互及查询。
toc: content
order: 1
cover: https://cdn.jsdelivr.net/gh/wwLoveWj/Picture-bed@imgs/images/202509061212539.png
group:
  title: 布局
version: 1.0.0
---

## 何时使用

- 用户可以在项目中需要展示表格数据处使用

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| params | 请求的参数 | `object` | `{}` |
| request | 请求url拿到结果的函数| `(params?: ParamsType & { current?: number; pageSize: number },) => Promise<any>` | `-` |
| rowKey | 表格唯一项 | `string` | `id` |
| columns | 表格配置项 | `Array[]` | `[]` |
| scroll | 滚动方式 | `object` | `{}` |
