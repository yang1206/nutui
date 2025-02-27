# TimeSelect 配送时间

### 介绍

用于配送时间选择

### 安装

```js
import { createApp } from 'vue';
import { TimeSelect, TimePannel, TimeDetail } from '@nutui/nutui-taro';

const app = createApp();
app.use(TimeSelect);
app.use(TimePannel);
app.use(TimeDetail);
```

### 基础用法

> demo: timeselect basic business

### 可选择多个日期时间

> demo: timeselect multiple business

### 更改标题

> demo: timeselect title business

## API

### TimeSelect Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示弹层 | boolean | `false` |
| height | 弹层的高度 | string | `20%` |
| title | 弹层标题 | string | `取件时间` |
| current-key | 唯一标识 | string \| number | `0` |
| current-time | 当前选择的时间，数组元素包含:key: string; list: string[] | Array | `[]` |
| lock-scroll | 背景是否锁定 | boolean | `true` |

### Slots

| 名称 | 说明 |
| --- | --- |
| title | 更改标题 |
| pannel | 左侧列表 |
| detail | 右侧详细内容 |

### TimePannel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 显示的名称 | string | `` |
| pannel-key | 唯一标识，和 current-key 一起标识当前选择的天 | string \| number | `0` |

### TimeDetail Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| times | 可选择的时间，数组元素同 `current-time` | Array | `[]` |

### TimeSelect Event

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 关闭遮罩之后的回调 | `key: string \| number, list: []` |

### TimePannel Event

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 点击内容的回调 | `pannelKey: string \｜ number` |

### TimeDetail Event

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击时间的回调 | `time: string` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/component/configprovider)。

| 名称 | 默认值 |
| --- | --- |
| --nut-timeselect-title-font-size | _var(--nut-font-size-2)_ |
| --nut-timeselect-title-color | _var(--nut-title-color)_ |
| --nut-timeselect-title-width | _100%_ |
| --nut-timeselect-title-height | _50px_ |
| --nut-timeselect-title-line-height | _50px_ |
| --nut-timeselect-pannel-bg-color | _#f6f7f9_ |
| --nut-timeselect-timepannel-text-color | _var(--nut-title-color2)_ |
| --nut-timeselect-timepannel-font-size | _var(--nut-font-size-2)_ |
| --nut-timeselect-timepannel-cur-bg-color | _var(--nut-white)_ |
| --nut-timeselect-timepannel-cur-text-color | _#333333_ |
| --nut-timeselect-timepannel-width | _140px_ |
| --nut-timeselect-timepannel-height | _40px_ |
| --nut-timeselect-timepannel-padding | _15px_ |
| --nut-timeselect-timedetail-padding | _0 5px 50px 13px_ |
| --nut-timeselect-timedetail-item-width | _100px_ |
| --nut-timeselect-timedetail-item-height | _50px_ |
| --nut-timeselect-timedetail-item-line-height | _50px_ |
| --nut-timeselect-timedetail-item-bg-color | _#f6f7f9_ |
| --nut-timeselect-timedetail-item-border-radius | _5px_ |
| --nut-timeselect-timedetail-item-text-color | _#333333_ |
| --nut-timeselect-timedetail-item-text-font-size | _var(--nut-font-size-2)_ |
| --nut-timeselect-timedetail-item-cur-bg-color | _var(--nut-primary-color)_ |
| --nut-timeselect-timedetail-item-cur-border | _var(--nut-primary-color)_ |
| --nut-timeselect-timedetail-item-cur-text-color | _var(--nut-primary-color)_ |
