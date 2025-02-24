# Pagination 分页

### 介绍

当数据量较多时，采用分页的形式分隔长列表。

### 安装

```js
import { createApp } from 'vue';
import { Pagination } from '@nutui/nutui';

const app = createApp();
app.use(Pagination);
```

### 基础用法

通过 v-model 来绑定当前页码。

> demo: pagination basic

### 简单模式

将 mode 设置为 `simple` 来切换到简单模式，此时分页器不会展示具体的页码按钮。

> demo: pagination simple

### 显示省略号

设置 force-ellipses 后会展示省略号按钮，点击后可以快速跳转。

> demo: pagination ellipse

### 自定义按钮

> demo: pagination custom

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前页码 | number | `1` |
| mode | 显示模式,可选值为 `simple` | string | `multi` |
| prev-text | 上一页按钮文字 | string | `上一页` |
| next-text | 下一页按钮文字 | string | `下一页` |
| page-count | 总页数 | string \| number | `传入/根据页数计算` |
| total-items | 总记录数 | string \| number | `0` |
| items-per-page | 每页记录数 | string \| number | `10` |
| show-page-size | 显示的页码个数 | string \| number | `5` |
| force-ellipses | 是否显示省略号 | boolean | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码改变时触发 | value |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| prev-text | 自定义上一页按钮内容 | - |
| next-text | 自定义下一页按钮内容 | - |
| page | 自定义页码 | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/component/configprovider)。

| 名称 | 默认值 |
| --- | --- |
| --nut-pagination-color | _var(--nut-primary-color)_ |
| --nut-pagination-font-size | _var(--nut-font-size-2)_ |
| --nut-pagination-item-border-color | _#e4e7eb_ |
| --nut-pagination-active-background-color | _linear-gradient(135deg,var(--nut-primary-color) 0%,var(--nut-primary-color-end) 100%)_ |
| --nut-pagination-disable-color | _rgba(116, 116, 116, 0.31)_ |
| --nut-pagination-disable-background-color | _#f7f8fa_ |
| --nut-pagination-item-border-width | _1px_ |
| --nut-pagination-item-border-radius | _2px_ |
| --nut-pagination-prev-next-padding | _0 11px_ |
