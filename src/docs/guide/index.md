---
title: 贡献指南
order: 2
---

# 贡献指南

这篇指南会指导如何参与到 `antd-wj` 的开发中来，请你在开发之前花几分钟来阅读一遍这篇指南。

## 项目结构

```
├── .dumi              dumi框架自动生成
├── .husky             git hooks 在各个阶段执行命令的配置
│ └── pre-commit       git hooks 在 pre-commit 阶段执行命令的配置
├── dist               文档打包生成文件目录
├── lib                组件库打包生成文件目录
│ └── esm              组件库打包生成的 es module
├── public             文档打包之后不做处理，直接复制到 dist 目录
├── src
│ ├── docs             站点文档目录，dumi会扫描该目录下的 md 文件生成文档，采用约定式生成路由
│ ├── components       组件目录
│ │    └── index.ts    导出文件，导出 component 及 ts 类型
│ ├── hooks            hooks目录
│ │    └── index.ts    导出文件，导出 hook 及 ts 类型
│ ├── utils            工具函数目录
│ │    └── index.ts    导出文件，导出 util 及 ts 类型
│ ├── variables.less      全局样式
│ └── index.ts         整个库导出口，所有的 components, utils, hooks 都在这里导出，包括 ts 类型
├── .dumirc.ts         dumi配置文件
├── .editorconfig
├── .fatherrc.ts       fatherrc配置文件，组件库打包工具，默认使用 bundless 模式
├── .gitattributes     git 配置文件，统一末尾换行符为 lf
├── .gitignore
├── .lintstagedrc.js   git hooks 提交只检查 staged 文件，不用全项目检查
├── .prettierrc.js
├── .eslintrc.js
├── .prettierignore
├── tsconfig.json      ts 项目配置文件
├── typing.d.ts        整个项目公共类型声明文件
├── package.json
├── yarn.lock
└── README.md
```

## 分支管理

目前暂存主版本号 `v1.x`，都是基于 `antd v4`

组件库开发是基于 `devlop-master` 分支创建 `feature-2024.xx.xx` 分支开发，开发完成再合并回 `devlop-master` 分支，最后删除本地和远程的 `feature-2024.xx.xx` 分支，具体细节步骤请看下面的开发流程。

## 开发流程

在你 clone 了 <a href="https://github.xxx.com/wj/antd-wj-frontend" target="_blank">antd-wj 代码</a> 并且使用 `yarn install` 安装完依赖后，你还可以运行下面几个常用的命令：

- `yarn start` 在本地运行文档网站
- `yarn build` 构建 antd-wj 的 esm 版本到 lib/esm 目录
- `yarn build:docs` 构建 antd-wj 的静态文档网站代码到 dist 目录
- `yarn lint` 检查代码风格

### components 开发

1. 以 `Button` 组件为例，基于 `devlop-master` 新建 `feature-2024.xx.xx` feature 分支。

```shell
# 在 devlop-master 分支下
git checkout -b feature-2024.xx.xx
# 推送到远端并建立关联
git push origin feature-2024.xx.xx
git push --set-upstream origin feature-2024.xx.xx:feature-2024.xx.xx
```

2. 在 `src/components` 下创建`Button`目录，目录结构如下，组件 API 命名请参考<a href="https://github.com/ant-design/ant-design/wiki/API-Naming-rules" target="_blank"> API 规范 </a>。

:::warning

所有的组件命名都必须以 `Wj` 开头，命名使用 UperCamelCase（大驼峰）风格。

:::

```
└── components
  └── WjButton
    ├── demo                  演示代码目录
    │    └── basic.tsx             基础的组件演示代码
    ├── components                如果组件较复杂，可以创建该目录存放子组件代码（可选）
    ├── button.tsx                组件代码
    ├── index.ts                  组件导出口，包含组件代码和 ts 类型
    ├── types.ts                  组件类型，如果类型声明不多，可直接写在 button.tsx 中（可选）
    └── index.md                  组件文档
```

3. 在 `src/components/WjButton/index.ts` 导出代码和类型。

```ts
import WjButton from './button';
import type { ButtonProps } from './types';

export default WjButton;
export type { ButtonProps };
```

4. 在 `src/components/index.ts` 导出代码和类型。

```ts
export { default as WjButton } from './WjButton';
export type { ButtonProps } from './WjButton';
```

5. `yarn commit` 按照提示填写 <a href="/design#git-message-规范" target="_blank">Git Message 规范</a>，比较熟悉的可手写规范。

```shell
yarn commit
# or
git commit -m "feat(button): 新增Button示例组件"
```

6. 合并到 `devlop-master` 分支中，并删除 feature 分支。

```shell
git checkout devlop-master
git merge feature-2024.xx.xx
# 删除本地和远程分支
git branch -D feature-2024.xx.xx
git push origin --delete feature-2024.xx.xx
```

## 组件库发布

组件库的发布都在 `devlop-master` 分支中操作：

### 自动发布

- 发布正式版本号：运行 `yarn release`

- 发布先行版本号：运行 `yarn release:beta`

组件库中已集成好 `standard-version`，会根据 `Git Message` 自动升级版本号，策略如下。

- 主版本号：当 Git Message 中含 `BREAKING CHANGE` 会自增
- 次版本号：当 Git Message 中含 `type=feat` 会自增。
- 修订号：当 Git Message 中含 `type=fix` 会自增。

### 手动发布

1. 手动升级版本号，请遵守 <a href="/design#版本号规范" target="_blank">版本号规范</a>。

2. `git commit -m "chore(release): 2.0.0"`，注意一定要按照规范写 message。

3. 运行 `npm publish`，构建代码并推送到马上云镜像仓库。

4. 打版本 tag `git tag -a v2.0.0`。

5. 推送到 gitlab，`git push --follow-tags`。

:::info{title=首次发布}

如果是第一次发布需要先添加账户 `npm adduser --registry https://registry.npmjs.com/` 按照提示注册账号信息

:::

## 文档发布

- 构建分支 `devlop-master`
- 部署环境 `master`
