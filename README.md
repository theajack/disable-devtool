<h1><a href='https://www.github.com/theajack/disable-devtool'>Disable-devtool</a></h1>

<h2>🚀 Disable web developer tools with one line </h2>

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

**[中文](https://github.com/theajack/disable-devtool/blob/master/README.cn.md) | [online trial/document](https://theajack.gitee.io/disable-devtool) | [Version Log](https://github.com/theajack/disable-devtool/blob/master/helper/version.md) | [Gitee](https://gitee.com/theajack/disable-devtool)**

## 1. Quick use

### 1.1 npm reference

```
npm i disable-devtool
```

```js
import disableDevtool from 'disable-devtool';

disableDevtool();
```

### 1.2 script attribute configuration

```html
<script id='disable-devtool' src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
```

Or use cdn with version:

```html
<!--Use a specific version-->
<script id='disable-devtool' src='https://cdn.jsdelivr.net/npm/disable-devtool@x.x.x/disable-devtool.min.js'></script>
<!--Use latest version-->
<script id='disable-devtool' src='https://cdn.jsdelivr.net/npm/disable-devtool@latest/disable-devtool.min.js'></script>
```

## 2. Function

disable-devtool can disable all the methods that can enter the developer tools to prevent ‘code handling’ through the developer tools

The library has the following features:

1. Support configurable whether to disable the right-click menu
2. Disable f12 and ctrl+shift+i shortcuts
3. Support recognition to open the developer tools from the browser menu bar and close the current page
4. Developers can bypass the disablement (use tk and md5 encryption for url parameters)
5. Support almost all browsers (Include IE)
6. Highly configurable
7. Minimal use, small size (only 6kb)
8. Support npm reference and script tag reference (attribute configuration)
9. Identify the real mobile terminal and browser developer tool settings plug-in forged mobile terminal, saving performance for the mobile terminal

## 3. Use

### 3.1 Configuration parameters when using npm

Install disable-devtool

```
npm i disable-devtool
```

```js
import disableDevtool from 'disable-devtool';

disableDevtool(options);
```

The parameters and descriptions in options are as follows:

```ts
declare interface optionStatic {
    md5?: string; // Bypass the disabled md5 value, see 3.2 for details, the bypass disable is not enabled by default
    url?: string; // Jump to the page when closing the page fails, the default value is localhost
    tkName?: string; // Bypass the url parameter name when disabled, the default is ddtk
    ondevtoolopen?(): void; // Callback for opening the developer panel, the url parameter is invalid when enabled
    debugDelay?: number; // The delay in debug mode is 200ms by default
    interval?: number; // Timer interval is 200ms by default
    disableMenu?: boolean; // Whether to disable the right-click menu The default is true
    stopIntervalTime?: number; // Waiting time to cancel monitoring on mobile
}
```

Note: The disableMenu parameter is invalid under ie, because the right button under ie will block the main process and cannot monitor

### 3.2 md5 and tk bypass disable

The combination of key and md5 in the library allows developers to bypass the disabling online.

The process is as follows:

First specify a key a (the value should not be recorded in the code), use md5 encryption to obtain a value b, and pass in b as the md5 parameter. Developers only need to bring the url parameter ddtk=a when accessing the url. Bypass disabled.

The disableDevtool object exposes the md5 method, which can be used by developers when encrypting:

```js
disableDevtool.md5('xxx');
```

### 3.3 script uses attribute configuration

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

Note:

1. If you want to automatically disable,you must bring the `disable-devtool-auto` attribute when configuring attributes
2. Attribute configuration is optional, the fields are the same as in 3.1, the difference is that the hump form is changed to horizontal line division
3. The script tag is recommended to be placed at the bottom of the body

### 3.4 script does not use attribute configuration

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
<script>
    DisableDevtool({
        // The parameters are the same as in 3.1
    })
</script>
```