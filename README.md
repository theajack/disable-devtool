
<p align="center">
    <a href='https://www.github.com/theajack/disable-devtool'>
        <img src='https://shiyix.cn/images/disable-devtool3.png' width='240px'/>
    </a>
</p> 

<p align="center">
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
<p align="center">
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/disable-devtool/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/disable-devtool?color=%232DCE89" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/disable-devtool"><img src="https://img.shields.io/bundlephobia/minzip/disable-devtool.svg" alt="Size"></a>
    <a href="https://github.com/theajack/disable-devtool/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/disable-devtool.svg" alt="TopLang"></a>
    <!-- <a href="https://www.github.com/theajack/disable-devtool"><img src="https://img.shields.io/librariesio/dependent-repos/npm/disable-devtool.svg" alt="Dependent"></a> -->
    <img src="https://img.shields.io/badge/test-passed-44BB44" alt="test">
    <img src="https://shiyix.cn/api2/util/badge/stat?c=Visitors-disabledevtool" alt="visitors">
</p>

<h2>🚀 One line of code to disable web developer tools </h2>

**[中文](https://github.com/theajack/disable-devtool/blob/master/README.cn.md) | [Online Trial](https://theajack.github.io/disable-devtool) | [Changelog](https://github.com/theajack/disable-devtool/blob/master/scripts/version.md) | [Gitee](https://gitee.com/theajack/disable-devtool) | [Message Board](https://theajack.github.io/message-board?app=disable-devtool) ｜ QQ Group: 720626970**

----

<p align="">
    <a href="https://ko-fi.com/theajack">
        <img src="https://img.shields.io/badge/Donate-Ko Fi-ff5f5f" alt="test">
    </a>    
    <a href="https://paypal.me/tackchen">
        <img src="https://img.shields.io/badge/Donate-PayPal-142c8e" alt="test">
    </a>    
    <a href="https://shiyix.cn/images/wx-pay.png">
        <img src="https://img.shields.io/badge/Donate-Wechat Pay-00c250" alt="test">
    </a>
</p>

----

## 0. Sponsor

<p align="center">
    <a href="https://alinsjs.github.io/docs">
        <img width="130" src="https://shiyix.cn/images/alins.png" alt="alins">
    </a>    
    <p align="center"><a href="https://github.com/alinsjs/alins">Alins - The Most Elegant JS FrameWork</a></p>
</p>

## 1. Quick use

### 1.1 npm reference

```
npm i disable-devtool
```

```js
import DisableDevtool from 'disable-devtool';

DisableDevtool();
```

### 1.2 script attribute configuration

```html
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
```

Or cite by version:

```html
<!--Use the specified version-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@x.x.x'></script>
<!--Use latest version-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@latest'></script>
```

### 1.3 False trigger problem location help

----

<details>
    <summary>If you have problems during use, please click on me</summary>

Because there are many devices, browsers, and operating environments, it is inevitable that there will be some scenarios where the library is incompatible, and this part is used for developers to check the problem by themselves, and then feedback the details to issues to help us locate and solve bugs

#### 1.3.1 The probe was triggered incorrectly

In some cases, if the console is not opened but the page does not close or the jump is away, because a probe is triggered by error, use the following code to locate which probe was triggered by mistake:

```js
DisableDevtool({
    ondevtoolopen: (type) => {
        const info = 'devtool opened!; type =' + type;
        alert(info);
        // If you are worried about blocking the page, use console.warn(info); and open the console to view
    },
})
```

The above code needs to be used this when using script references

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
<script>
    DisableDevtool({
        ondevtoolopen: (type) => {
            const info = 'devtool opened!; type =' + type;
            alert(info); // If you are worried about blocking the page, use console.warn(info); and open the console to view
        },
    })
</script>
```

#### 1.3.2 The probe is not triggered

When devtool is opened in any way, but the page does not close or jump correctly, first try printing the following to see if the detector is working properly

```js
console.log(DisableDevtool.isRunning);
```

If it returns true, then this is an incompatibility problem because none of the probes are triggered, which is tricky, and there is currently no universal way to locate it

Please submit an issue, as detailed as possible with the browser version, device model and version, operating environment, preferably a screenshot or demo address, we will troubleshoot the corresponding problem later

</details>

----

## 2. Function

disable-devtool disables all access to the devtools, preventing 'code porting' via the devtools

The library has the following features:

1. Support configurable whether to disable the right-click menu
2. Disable shortcut keys such as f12 and ctrl+shift+i
3. Support recognition to open developer tools from browser menu bar and close the current page
4. Developers can bypass the disable (url parameters are encrypted with tk and md5)
5. Multiple monitoring modes, support almost all browsers (IE, 360, qq browser, FireFox, Chrome, Edge...)
6. Highly configurable, minimalist to use, compact
7. Support npm reference and script tag reference (property configuration)
8. Identify the real mobile terminal and the browser developer tool to set the plug-in forged mobile terminal to save performance for the mobile terminal
9. Support for identifying developer tools close events
10. Support configurable whether to disable selection, copy, cut, paste function
11. Support to identify eruda and vconsole debugging tools
12. Support suspending and resuming probe work
13. Support configuring ignore attributes to customize whether to enable probes
14. Support for configuring all parent pages in iframes to be disabled
    
## 3. Use

### 3.1 Configuration parameters when using npm

It is recommended to use this method of installation and use, and the script script can be intercepted by the agent separately and cannot be executed

install disable-devtool

```
npm i disable-devtool
```

```js
import DisableDevtool from 'disable-devtool';

DisableDevtool(options);
```

#### 3.1.1 Return value

Return value DisableDevtool The return value is of the following type

```ts
interface IDDResult {
    success: boolean; Indicates whether it is enabled normally
    reason: string; The reason why it was not properly enabled
}
```

#### 3.1.2 parameters

The parameters and descriptions in options are as follows:

```ts
declare interface IConfig {
    md5?: string; // bypass disabled md5 value, see 3.2 for details, bypass disabled by default
    url?: string; // Jump page when closing the page fails, the default value is localhost
    tkName?: string; // bypass url parameter name when disabled, default is ddtk
    ondevtoolopen?(type: DetectorType, next: Function): void; // The callback for opening the developer panel, the url parameter is invalid when enabled, the type is monitoring mode, see 3.5 for details, the next function is to close the current window
    ondevtoolclose?(): void; // callback for developer panel close
    interval?: number; // timer interval default 200ms
    disableMenu?: boolean; // Whether to disable the right-click menu Default is true
    stopIntervalTime?: number; // Waiting time to cancel monitoring on mobile
    clearIntervalWhenDevOpenTrigger?: boolean; // Whether to stop monitoring after triggering the default is false, this parameter is invalid when using ondevtoolclose
    detectors?: Array<DetectorType>; // Enabled detectors See 3.5 for details of detectors. The default is all, it is recommended to use all
    clearLog?: boolean; // Whether to clear the log every time
    disableSelect?: boolean; // Whether to disable selection text Default is false
    disableCopy?: boolean; // Whether to disable copying, default is false
    disableCut?: boolean; // Whether to disable cutting, default is false
    disablePaste: boolean; // Whether to disable paste, default is false
    ignore?: (string| RegExp)[] | null | (()=>boolean); // Some cases ignore the disablement
    disableIframeParents?: boolean; // Whether all parent windows are disabled in the iframe
    timeOutUrl?: string; // Turn off URLs that page timeouts forward towards
    rewriteHTML?: string; // Detecting the rewriting page after opening
}

enum DetectorType {
  Unknown = -1,
  RegToString = 0, // Check according to regular
  DefineId, // detect based on dom id
  Size, // Detect based on window size // After version 0.3.5, this probe is not enabled by default
  DateToString, // check against Date.toString
  FuncToString, // check according to Function.toString
  Debugger, // According to breakpoint detection, it is only valid in the case of ios chrome real machine
  Performance, // Performance detection based on log big data
  DebugLib, // Detect third-party debugging tools eruda and vconsole
};
```

### 3.2 md5 and tk bypass disabled

The way in which the key is used in conjunction with md5 in this library allows developers to bypass the ban online.

The process is as follows:

First specify a key a (the value should not be recorded in the code), use md5 encryption to obtain a value b, and pass in b as the md5 parameter. When accessing the url, the developer only needs to bring the url parameter ddtk=a, then you can Bypass disable.

The disableDevtool object exposes the md5 method, which can be used by developers when encrypting:

```js
DisableDevtool.md5('xxx');
```

### 3.3 script uses attribute configuration

```html
<script
    disable-devtool-auto
    src='https://cdn.jsdelivr.net/npm/disable-devtool'
    md5='xxx'
    url='xxx'
    tk-name='xxx'
    interval='xxx'
    disable-menu='xxx'
    detectors='xxx'
    clear-log='true'
    disable-select='true'
    disable-copy='true'
    disable-cut='true'
    disable-paste='true'
></script>
```

Note:

1. If you want to disable it automatically, you must include the `disable-devtool-auto` property when configuring the property
2. The attribute configuration is optional, and the fields are the same as in 3.1, the difference is that the hump form is changed to a horizontal line.
3. The script tag is recommended to be placed at the bottom of the body
4. Detectors need to be separated by spaces, such as detectors='1 2 3'

### 3.4 script does not use attribute configuration

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
<script>
    DisableDevtool({
        // The parameters are the same as in 3.1
    })
</script>
```

### 3.5 Monitoring Mode

Disable-Devtool has the following monitoring modes, DisableDevtool.DetectorType enumerates all monitoring modes

```ts
enum DetectorType {
  Unknown = -1,
  RegToString = 0, // Check according to regular
  DefineId, // detect based on dom id
  Size, // Detect based on window size
  DateToString, // check against Date.toString
  FuncToString, // check according to Function.toString
  Debugger, // According to breakpoint detection, it is only valid in the case of ios chrome real machine
  Performance, // Performance detection based on log big data
  DebugLib, // Detect third-party debugging tools
};
```

The callback parameter of the ondevtoolopen event is the triggered monitoring mode

You can execute business logic in OndevtoolOpen, such as data reporting, user behavior analysis, etc

```ts
DisableDevtool({
    ondevtoolopen(type, next){
        alert('Devtool opened with type:' + type);
        next();
    }
});
```

### 3.6 Additional APIs

#### 3.6.1 isRunning

Used to get whether DisableDevtool is running (the pending or ignore state is also considered running because it can be turned on dynamically)

```js
DisableDevtool.isRunning;
```

#### 3.6.2 isSuspend

Used to get or set whether DisableDevtool is suspended (suspended state, all disabled will be temporarily disabled)

```js
DisableDevtool.isSuspend = true;
DisableDevtool.isSuspend = false;
```

#### 3.6.3 config.ignore

ignore is used to customize certain ignored scenarios

1. Pass in the array

The incoming array is supported by strings and regular expressions that indicate whether the matching link contains the incoming content, using the following

```js
DisableDevtool({
    ignore: [
        '/user/login', // Disabled is temporarily ignored when the link contains this content
        /\/user\/[0-9]{6}/, // When a link matches that regular, disabling is temporarily ignored
    ]
});
```

2. Pass in the function

The passing function represents a custom judgment condition and returns a bool type, as follows

```js
DisableDevtool({
    ignore: () => {
        return userType === 'admin'; // Disable is ignored when you are an administrator
    }
});
```

#### 3.6.4 version

Get DisableDevtool version

```js
DisableDevtool.version;
```
