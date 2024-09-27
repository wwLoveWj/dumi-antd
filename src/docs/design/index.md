---
title: 设计规范
order: 0
---
# 设计规范

为了保证项目内使用的颜色统一且符合设计规范，故而提供如下能力：

1. 导出一个 `modifyVars`配置对象，在项目中通过配置 `less loader`统一覆盖 `antd`的默认样式，使得 `antd`组件样式与公司设计规范 保持一致。
2. 导出一个 `less`文件，将公司设计规范中的公共样式提取为 `less`变量，项目中引入这个 `less`文件即可使用这些 `less`变量。
3. 导出一个 `designColor`对象，以便在 `jsx/tsx`文件中也能使用与 `less`变量相同的公共样式。

## 使用方式

### 覆盖 antd 的 less 变量

通过 `webpack`的 `less loader`使用导出的 `modifyVars`对象覆盖 `antd`的 `less`变量。若是 umi 项目可在 `config/config.ts` 中配置。例如：

```typescript
// 注意：需要从 cjs 中导入 modifyVars 对象
import modifyVars from '@wj/magical-components/dist/design/modifyVars';
import { defineConfig } from 'umi';

const config = defineConfig({
    // ...其他配置
    modifyVars: {
        ...modifyVars
    }
    // ...其他配置
});

export default config;
```

### 使用 less 变量

在项目的 `less`文件中导入公共的 `less`变量定义文件，例如：

```less
@import '@wj/magical-components/dist/design/global/index.less';

.lessVars {
  width: 200px;
  height: 50px;
  margin-top: @space-md;
  font-size: @space-md;
  line-height: 50px;
  text-align: center;
  background-color: @error-color;
  border-radius: @border-radius-lg;
}
```

### 使用 designColor 对象

在项目的 `jsx/tsx`文件中可以通过 `designColor`对象来使用公共的样式变量，例如：

```typescript
import { designColor } from '@wj/magical-components';

export const App = () => {
    return (
        <div
            style={{
              width: 200,
              height: 50,
              lineHeight: '50px',
              textAlign: 'center',
              marginTop: designColor.space.md,
              fontSize: designColor.fontSize.large,
              borderRadius: designColor.fontSize.medium,
              backgroundColor: designColor.color.success
            }}
          >
            测试designColor
          </div>
     )
}
```

## 公司设计规范样式速查表

### 颜色
|  样式值  | less变量                   | js变量                              |
| --------- | ---------------------------- | ------------------------------------- |
| `#006EFF` | `@primary-color`             | `designColor.color.primary`           |
| `#2e90ff` | `@primary-hover-color`       | `designColor.color.primaryHover`      |
| `#0054ad` | `@primary-active-color`      | `designColor.color.primaryActive`     |
| `#bae1ff` | `@primary-disable-color`     | `designColor.color.primaryDisable`    |
| `#e8f6ff` | `@primary-white-hover-color` | `designColor.color.primaryWhiteHover` |
| `#20242e` | `@emphasis-color`            | `designColor.color.emphasis`          |
| `#464f5c` | `@sub-emphasis-color`        | `designColor.color.subEmphasis`       |
| `#78858f` | `@secondary-color`           | `designColor.color.secondary`         |
| `#c2c6cc` | `@dim-color`                 | `designColor.color.dim`               |
| `#e6e8eb` | `@white-color`               | `designColor.color.white`             |
| `#c9ccd1` | `@gray-color`                | `designColor.color.gray`              |
| `#f7f8fa` | `@light-gray-color`          | `designColor.color.lightGray`         |
| `#eceef1` | `@white-gray-color`          | `designColor.color.whiteGray`         |
| `#dfe1e6` | `@medium-gray-color`         | `designColor.color.mediumGray`        |
| `#c2c6cc` | `@silver-grey-color`         | `designColor.color.silverGray`        |
| `#464f5c` | `@dark-grey-color`           | `designColor.color.darkGray`          |
| `#12b02c` | `@success-color`             | `designColor.color.success`           |
| `#46cb6f` | `@success-hover-color`       | `designColor.color.successHover`      |
| `#009d1f` | `@success-active-color`      | `designColor.color.successActive`     |
| `#aff1b1` | `@success-disable-color`     | `designColor.color.successDisable`    |
| `#e8fce8` | `@success-white-hover-color` | `designColor.color.successWhiteHover` |
| `#ff8800` | `@warning-color`             | `designColor.color.warning`           |
| `#ffa52e` | `@warning-hover-color`       | `designColor.color.warningHover`      |
| `#e07000` | `@warning-active-color`      | `designColor.color.warningActive`     |
| `#ffe8ba` | `@warning-disable-color`     | `designColor.color.warningDisable`    |
| `#fff8e8` | `@warning-white-hover-color` | `designColor.color.warningWhiteHover` |
| `#f54545` | `@error-color`               | `designColor.color.error`             |
| `#f55953` | `@error-hover-color`         | `designColor.color.errorHover`        |
| `#c1363b` | `@error-active-color`        | `designColor.color.errorActive`       |
| `#fccdca` | `@error-disable-color`       | `designColor.color.errorDisable`      |
| `#ffeded` | `@error-white-hover-color`   | `designColor.color.errorWhiteHover`   |

### 字号
| 样式值 | less变量            | js变量                          |
| ------ | -------------------- | ------------------------------ |
| `12px` | `@font-size-small`   | `designColor.fontSize.small`   |
| `14px` | `@font-size-normal`  | `designColor.fontSize.normal`  |
| `16px` | `@font-size-medium`  | `designColor.fontSize.medium`  |
| `20px` | `@font-size-large`   | `designColor.fontSize.large`   |

### 字重
| 样式值 | less变量                | js变量                             |
| ------ | ----------------------- | --------------------------------- |
| `400`  | `@font-weight-normal`   | `designColor.fontWeight.normal`   |
| `500`  | `@font-weight-medium`   | `designColor.fontWeight.medium`   |
| `600`  | `@font-weight-semibold` | `designColor.fontWeight.semibold` |

### 间距
| 样式值  | less变量      | js变量                    |
| ------- | --------------| ------------------------ |
| `4px`   | `@space-xs`   | `designColor.space.xs`   |
| `8px`   | `@space-sm`   | `designColor.space.sm`   |
| `16px`  | `@space-md`   | `designColor.space.md`   |
| `24px`  | `@space-lg`   | `designColor.space.lg`   |

### 圆角
| 样式值  | less变量              | js变量                           |
| ------- | ----------------------| ------------------------------- |
| `2px`   | `@border-radius-sm`   | `designColor.borderRadius.sm`   |
| `4px`   | `@border-radius-md`   | `designColor.borderRadius.md`   |
| `8px`   | `@border-radius-lg`   | `designColor.borderRadius.lg`   |
| `50%`   | `@border-radius-full` | `designColor.borderRadius.full` |
