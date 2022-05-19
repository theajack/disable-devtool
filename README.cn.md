
<h1><a href='https://www.github.com/theajack/disable-devtool'>Disable-devtool</a></h1>

<h2>🚀 一行代码搞定禁用web开发者工具 </h2>

----

<p>
    <a href="https://www.github.com/theajack/disable-devtool/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/disable-devtool?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/disable-devtool/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/disable-devtool?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/disable-devtool" target="_black">
        <img src="https://img.shields.io/npm/v/disable-devtool?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/disable-devtool" target="_black">
        <img src="https://img.shields.io/npm/dm/disable-devtool?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/disable-devtool" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/disable-devtool/badge" alt="jsdelivr" />
    </a>
    <a href="https://github.com/theajack/disable-devtool/issues"><img src="https://img.shields.io/github/issues-closed/theajack/disable-devtool.svg" alt="issue"></a>
</p>
<p>
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/disable-devtool/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/disable-devtool?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://fastly.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js"><img src="https://img.shields.io/bundlephobia/minzip/disable-devtool.svg" alt="Size"></a>
    <a href="https://github.com/theajack/disable-devtool/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/disable-devtool.svg" alt="TopLang"></a>
    <a href="https://www.github.com/theajack/disable-devtool"><img src="https://img.shields.io/librariesio/dependent-repos/npm/disable-devtool.svg" alt="Dependent"></a>
    <a href="https://github.com/theajack/disable-devtool/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>

**[English](https://github.com/theajack/disable-devtool/blob/master/README.md) | [在线试用/文档](https://theajack.github.io/disable-devtool) | [更新日志](https://github.com/theajack/disable-devtool/blob/master/helper/version.md) | [Gitee](https://gitee.com/theajack/disable-devtool) | [留言板](https://theajack.github.io/message-board?app=disable-devtool)**

## 1. 快速使用

### 1.1 npm 引用

```
npm i disable-devtool
```

```js
import disableDevtool from 'disable-devtool';

disableDevtool();
```

### 1.2 script属性配置

```html
<script disable-devtool-auto src='https://fastly.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
```

或者通过版本引用:

```html
<!--使用指定版本-->
<script disable-devtool-auto src='https://fastly.jsdelivr.net/npm/disable-devtool@x.x.x/disable-devtool.min.js'></script>
<!--使用最新版本-->
<script disable-devtool-auto src='https://fastly.jsdelivr.net/npm/disable-devtool@latest/disable-devtool.min.js'></script>
```

## 2.功能

disable-devtool 可以禁用所有一切可以进入开发者工具的方法，防止通过开发者工具进行的 ‘代码搬运’

该库有以下特性:

1. 支持可配置是否禁用右键菜单
2. 禁用 f12 和 ctrl+shift+i 快捷键
3. 支持识别从浏览器菜单栏打开开发者工具并关闭当前页面
4. 开发者可以绕过禁用 (url参数使用tk配合md5加密)
5. 多种监测模式，支持几乎所有浏览器（IE,360,qq浏览器,FireFox,Chrome,Edge...）
6. 高度可配置
7. 使用极简、体积小巧 (仅7kb)
8. 支持npm引用和script标签引用(属性配置)
9. 识别真移动端与浏览器开发者工具设置插件伪造的移动端，为移动端节省性能
10. 支持识别开发者工具关闭事件

## 3. 使用

### 3.1 npm使用时的配置参数

安装 disable-devtool

```
npm i disable-devtool
```

```js
import disableDevtool from 'disable-devtool';

disableDevtool(options);
```

options中的参数与说明如下：

```ts
declare interface optionStatic {
    md5?: string; // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
    url?: string; // 关闭页面失败时的跳转页面，默认值为localhost
    tkName?: string; // 绕过禁用时的url参数名称，默认为 ddtk
    ondevtoolopen?(type: DetectorType, next: Function): void; // 开发者面板打开的回调，启用时url参数无效，type 为监测模式，详见3.5
    ondevtoolclose?(): void;
    interval?: number; // 定时器的时间间隔 默认200ms
    disableMenu?: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime?: number; // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger?: boolean; // 是否在触发之后停止监控 默认为false， 在使用ondevtoolclose时该参数无效
    detactors?: Array<DETECTOR_TYPE>; // 启用的检测器 检测器详情见 3.5 默认为全部，建议使用全部
    clearLog?: boolean; // 是否每次都清除log
    disableSelect?: boolean; // 是否禁用选择文本 默认为false
    disableCopy?: boolean; // 是否禁用复制 默认为false
    disableCut?: boolean; // 是否禁用剪切 默认为false
}

declare type DETECTOR_TYPE = -1 | 0 | 1 | 2 | 3 | 4 ｜ 5; // 检测器详情见 3.5
```

### 3.2 md5 与 tk 绕过禁用

该库中使用 key 与 md5 配合的方式使得开发者可以在线上绕过禁用。

流程如下：

先指定一个 key a（该值不要记录在代码中），使用 md5 加密得到一个值 b，将b作为 md5 参数传入，开发者在访问 url 的时候只需要带上url参数 ddtk=a，便可以绕过禁用。

disableDevtool对象暴露了 md5 方法，可供开发者加密时使用：

```js
disableDevtool.md5('xxx');
```

### 3.3 script使用属性配置

```html
<script 
    disable-devtool-auto
    src='https://fastly.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'
    md5='xxx'
    url='xxx'
    tk-name='xxx'
    interval='xxx'
    disable-menu='xxx'
    detectors='xxx'
></script>
```

注：

1. 如希望自动禁用，属性配置时必须要带上 `disable-devtool-auto` 属性
2. 属性配置都是可选的，字段与3.1中一致，区别是将驼峰形式改成横线分割
3. 该script标签建议放在body最底部
4. detectors 需要使用空格分割，如 detectors='1 2 3'

### 3.4 script不使用属性配置

```html
<script src='https://fastly.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
<script>
    DisableDevtool({
        // 参数与3.1中一致
    })
</script>
```

### 3.5 监测模式

Disable-Devtool 有五种监测模式, DisableDevtool.DETECTOR_TYPE 为所有的监测模式枚举

```js
const DETECTOR_TYPE = {
    UNKONW: -1,
    REG_TO_STRING: 0, // 根据正则检测
    DEFINE_ID: 1, // 根据dom id检测
    SIZE: 2, // 根据窗口尺寸检测
    DATE_TO_STRING: 3, // 根据Date.toString 检测
    FUNC_TO_STRING: 4, // 根据Function.toString 检测
    DEBUGGER: 5; // 根据断点检测，仅在ios chrome 真机情况下有效
}
```

ondevtoolopen 事件的回调参数就是被触发的监测模式