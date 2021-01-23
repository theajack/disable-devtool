
<h1><a href='https://www.github.com/theajack/disable-devtool'>Disable-devtool</a></h1>

<h2>🚀 一行代码搞定禁用web开发者工具 </h2>

----

<p align="">
    <a href="https://www.github.com/theajack/disable-devtool"><img src="https://img.shields.io/github/stars/theajack/disable-devtool.svg?style=social" alt="star"></a>
    <a href="https://theajack.gitee.io"><img src="https://img.shields.io/badge/author-theajack-blue.svg?style=social" alt="Author"></a>
</p> 

<p align="">
    <a href="https://www.npmjs.com/package/disable-devtool"><img src="https://img.shields.io/npm/v/disable-devtool.svg" alt="Version"></a>
    <a href="https://npmcharts.com/compare/disable-devtool?minimal=true"><img src="https://img.shields.io/npm/dm/disable-devtool.svg" alt="Downloads"></a>
    <a href="https://cdn.jsdelivr.net/gh/theajack/disable-devtool/dist/disable-devtool.latest.min.js"><img src="https://img.shields.io/bundlephobia/minzip/disable-devtool.svg" alt="Size"></a>
    <a href="https://github.com/theajack/disable-devtool/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/disable-devtool.svg" alt="License"></a>
    <a href="https://github.com/theajack/disable-devtool/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/disable-devtool.svg" alt="TopLang"></a>
    <a href="https://github.com/theajack/disable-devtool/issues"><img src="https://img.shields.io/github/issues-closed/theajack/disable-devtool.svg" alt="issue"></a>
    <a href="https://www.github.com/theajack/disable-devtool"><img src="https://img.shields.io/librariesio/dependent-repos/npm/disable-devtool.svg" alt="Dependent"></a>
</p>

**[English](https://github.com/theajack/disable-devtool/blob/master/README.md) | [在线试用/文档](https://theajack.gitee.io/disable-devtool) | [更新日志](https://github.com/theajack/disable-devtool/blob/master/helper/version.md) | [Gitee](https://gitee.com/theajack/disable-devtool)**

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
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
```

或者通过版本引用:

```html
<!--使用指定版本-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@x.x.x/disable-devtool.min.js'></script>
<!--使用最新版本-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@latest/disable-devtool.min.js'></script>
```

## 2.功能

disable-devtool 可以禁用所有一切可以进入开发者工具的方法，防止通过开发者工具进行的 ‘代码搬运’

该库有以下特性:

1. 支持可配置是否禁用右键菜单
2. 禁用 f12 和 ctrl+shift+i 快捷键
3. 支持识别从浏览器菜单栏打开开发者工具并关闭当前页面
4. 开发者可以绕过禁用 (url参数使用tk配合md5加密)
5. 支持几乎所有浏览器（包含IE）
6. 高度可配置
7. 使用极简、体积小巧 (仅6kb)
8. 支持npm引用和script标签引用(属性配置)
9. 识别真移动端与浏览器开发者工具设置插件伪造的移动端，为移动端节省性能

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
    ondevtoolopen?(): void; // 开发者面板打开的回调，启用时url参数无效
    debugDelay?: number; // debug模式时的延迟 默认200ms
    interval?: number; // 定时器的时间间隔 默认200ms
    disableMenu?: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime?: number; // 在移动端时取消监视的等待时长
}
```

备注：disableMenu参数在ie下无效，因为ie下右键会阻塞主进程，且无法监听

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
    src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'
    md5='xxx'
    url='xxx'
    tk-name='xxx'
    debug-delay='xxx'
    interval='xxx'
    disable-menu='xxx'
></script>
```

注：

1. 如希望自动禁用，属性配置时必须要带上 `disable-devtool-auto` 属性
2. 属性配置都是可选的，字段与3.1中一致，区别是将驼峰形式改成横线分割
3. 该script标签建议放在body最底部

### 3.4 script不使用属性配置

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
<script>
    DisableDevtool({
        // 参数与3.1中一致
    })
</script>
```