---
title: WjRadio - 单选
toc: content
group:
  title: 操作
cover: /images/wjcopy.png
---

## 基本使用

<code src="./__demo__/base.tsx"></code>

## API

| 参数     | 说明               | 类型        | 默认值 |
| -------- | ------------------ | ----------- | ------ |
| options     | 以配置形式设置子元素     | `Array<RadioOptionType>`    |   -     |
| value     | 用于设置当前选中的值     | `any`    |   -     |
| onChange | 选项变化时的回调函数 | `function(e:Event)` |   -     |
| labelWidth | label的宽度 | `string \| number` |   200    |
| styles | radio的相关步长配置 | ` Record<string, string>` |   `{ '--colorRadio': '#255ff4','--tranlateX': '6.65em','--tranlateY':'-2.5em',}`    |
