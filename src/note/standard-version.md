[本文来源](https://blog.csdn.net/weixin_30716141/article/details/95727437)

## commitizen 安装
```Bash
$ npm install -g commitizen
# 或者本地安装
$ npm install --save-dev commitizen
```
安装适配器（Adapter)
因为不同的项目本身的构建方式的不同，commitizen 支持不同适配器的扩展，从而去满足不同的构建需求的。本文主要使用cz-conventional-changelog的构建标准，当然你也可以根据具体的情况选择其他的适配器，更多请看。
```Bash
$ npm install -g cz-conventional-changelog
```
全局安装完成后，我们需要在项目根目录下添加 .czrc 配置文件，文件内容如下：

```
// path 用来指定适配器
{ "path": "cz-conventional-changelog" }
```

#### 本地安装
```Bash
$ npm install cz-conventional-changelog --save-dev
# 或者使用 commitizen 工具
$ commitizen init cz-conventional-changelog --save-dev --save-exact
```
commitizen 工具会自动在package.json中添加配置相应的配置，具体如下：
```
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```
安装并添加完后，我们便可以在package.json文件中添加 "commit":"cz" 命令替换 git commit 来使用了。我们修改一个文件并 git add 后，通过 yarn commit 试一下：
![运行截图](https://cdn.jsdelivr.net/gh/wwLoveWj/Picture-bed@imgs/images/202409271443327.png)
可以看到，git cz 给出了 commit 的几种类型选项，如下：

> * feat 新功能
> * fix Bug 修复
> * docs 文档更新
> * style 代码的格式，标点符号的更新
> * refactor 代码重构
> * perf 性能优化
> * test 测试更新
> * build 构建系统或者包依赖更新
> * ci CI 配置，脚本文件等更新
> * chore 非 src 或者 测试文件的更新
> * revert commit 回退

使用的时候，我们应该根据项目具体变更情况选择。如果想修改已经打好的 commit 信息，我们可以通过 git reset命令来修复。

需要注意的是，仅仅是添加 commit 工具是不够的，为了保证 commit 格式的一致性，这里强烈建议你记得整合 commitlint 工具, 配合 git commit-msg hook 来使用，在这里就不相信介绍了，具体可以查看官方文档。

---

## standard-version
standard-version 是一款遵循语义化版本（ semver）和 commit message 标准规范 的版本和 changlog 自动化工具。通常情况线下，我们会在 master 分支进行如下的版本发布操作：

```Bash
1. git pull origin master
2. 根据 pacakage.json 中的 version 更新版本号，更新 changelog
3. git add -A, 然后 git commit
4. git tag 打版本操作 
5. push 版本 tag 和 master 分支到仓库 
```
其中2，3，4则是 standard-version 工具会自动完成的工作，配合本地的 shell 脚本，则可以自动完成一系列版本发布的工作了。

### 安装 & 使用
在这里我仍然推荐的全局安装：
```Bash
$ npm install -g standard-version
# 或者
$ npm install --save-dev standard-version
```
执行：
```Bash
# Help standard-version --help
$ standard-version 
```
执行 standard-version 命令，我们会在控制台看到整个执行流程的 log 信息，在这里几个常用的参数需要注意下:

#### --release-as, -r 指定版本号
默认情况下，工具会自动根据 主版本（major）,次版本（ minor） or 修订版（patch） 规则生成版本号，例如如果你package.json 中的version 为 1.0.0, 那么执行后版本号则是：1.0.1。自定义可以通过：
```Bash
$ standard-version -r minor
# output 1.1.0
$ standard-version -r 2.0.0
# output 2.0.0
$ standard-version -r 2.0.0-test
# output 2.0.0-test
```
需要注意的是，这里的版本名称不是随便的字符，而是需要遵循语义化版本（ semver） 规范的

#### --prerelease, -p 预发版本命名
用来生成预发版本, 如果当期的版本号是 2.0.0，例如
```Bash
$ standard-version --prerelease alpha
# output 2.0.0-alpha.0
```

#### --tag-prefix, -t 版本 tag 前缀
用来给生成 tag 标签添加前缀，例如如果前版本号为 2.0.0，则：
```Bash
$ standard-version --tag-prefix "stable-"
# output tag: stable-v2.0.0
```
以上这几个参数可能我们用的比较多，还有其他选项可以通过 standard-version --help查看。
