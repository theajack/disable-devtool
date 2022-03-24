<h1><a href='https://www.github.com/theajack/disable-devtool'>Disable-devtool</a></h1>

<h2>🚀 Disable web developer tools with one line </h2>

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
    <a href="https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js"><img src="https://img.shields.io/bundlephobia/minzip/disable-devtool.svg" alt="Size"></a>
    <a href="https://github.com/theajack/disable-devtool/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/disable-devtool.svg" alt="TopLang"></a>
    <a href="https://www.github.com/theajack/disable-devtool"><img src="https://img.shields.io/librariesio/dependent-repos/npm/disable-devtool.svg" alt="Dependent"></a>
    <a href="https://github.com/theajack/disable-devtool/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>

**[中文](https://github.com/theajack/disable-devtool/blob/master/README.cn.md) | [online trial/document](https://theajack.gitee.io/disable-devtool) | [Version Log](https://github.com/theajack/disable-devtool/blob/master/helper/version.en.md) | [Gitee](https://gitee.com/theajack/disable-devtool)**

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
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
```

Or use cdn with version:

```html
<!--Use a specific version-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@x.x.x/disable-devtool.min.js'></script>
<!--Use latest version-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@latest/disable-devtool.min.js'></script>
```

## 2. Function

disable-devtool can disable all the methods that can enter the developer tools to prevent ‘code handling’ through the developer tools

The library has the following features:

1. Support configurable whether to disable the right-click menu
2. Disable f12 and ctrl+shift+i shortcuts
3. Support recognition to open the developer tools from the browser menu bar and close the current page
4. Developers can bypass the disablement (use tk and md5 encryption for url parameters)
5. Multiple monitoring modes, support almost all browsers (IE, 360, qq browser, FireFox, Chrome, Edge...)
6. Highly configurable
7. Minimal use, small size (only 7kb)
8. Support npm reference and script tag reference (attribute configuration)
9. Identify the real mobile terminal and browser developer tool settings plug-in forged mobile terminal, saving performance for the mobile terminal
10. Support for identifying developer tool shutdown events

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
    ondevtoolopen?(type: DetectorType, next: Function): void; // Callback for opening the developer panel, the url parameter is invalid when it is enabled, and the type is the monitoring mode, see 3.5 for details
    ondevtoolclose?(): void;
    interval?: number; // Timer interval is 200ms by default
    disableMenu?: boolean; // Whether to disable the right-click menu The default is true
    clearIntervalWhenDevOpenTrigger?: boolean; // Whether to stop monitoring after triggering The default is false. This parameter is invalid when using ondevtoolclose
    detactors?: Array<DETECTOR_TYPE>; // Enabled detectors For details of detectors, see 3.5. The default is all, it is recommended to use all
    clearLog?: boolean; // Whether to clear the log every time
    disableSelect?: boolean; // Whether to disable select text The default is true
    disableCopy?: boolean; // Whether to disable copy text The default is true
    disableCut?: boolean; // Whether to disable cut text The default is true
}

declare type DETECTOR_TYPE = -1 | 0 | 1 | 2 | 3 | 4 ｜ 5; // For details of the detector, see 3.5
```

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
    interval='xxx'
    disable-menu='xxx'
    detectors='xxx'
></script>
```

Note:

1. If you want to automatically disable,you must bring the `disable-devtool-auto` attribute when configuring attributes
2. Attribute configuration is optional, the fields are the same as in 3.1, the difference is that the hump form is changed to horizontal line division
3. The script tag is recommended to be placed at the bottom of the body
4. detectors Need to use spaces to separate, such as detectors='1 2 3'

### 3.4 script does not use attribute configuration

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></script>
<script>
    DisableDevtool({
        // The parameters are the same as in 3.1
    })
</script>
```

### 3.5 Monitoring Mode

Disable-Devtool has five monitoring modes, DisableDevtool.DETECTOR_TYPE is an enumeration of all monitoring modes

```js
const DETECTOR_TYPE = {
    UNKONW: -1,
    REG_TO_STRING: 0, // According to regular detection
    DEFINE_ID: 1, // Detect according to dom id
    SIZE: 2, // Detect according to window size
    DATE_TO_STRING: 3, // Check according to Date.toString
    FUNC_TO_STRING: 4, // Detect according to Function.toString
    DEBUGGER: 5; // According to the breakpoint detection, it is only valid in the case of ios chrome real machine
}
```

The callback parameter of the ondevtoolopen event is the triggered monitoring mode