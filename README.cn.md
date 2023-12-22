
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

<h2>🚀 一行代码搞定禁用web开发者工具 </h2>

**[English](https://github.com/theajack/disable-devtool/blob/master/README.md) | [在线试用](https://theajack.github.io/disable-devtool) | [更新日志](https://github.com/theajack/disable-devtool/blob/scripts/helper/version.md) | [Gitee](https://gitee.com/theajack/disable-devtool) | [留言板](https://theajack.github.io/message-board?app=disable-devtool) ｜ QQ交流群: 720626970**

----

开源维护不易，如果您有经济条件的话，可以捐赠给作者一杯咖啡

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

## 0. 赞助商

<p align="center">
    <a href="https://alinsjs.github.io/docs">
        <img width="130" src="https://shiyix.cn/images/alins.png" alt="alins">
    </a>    
    <p align="center"><a href="https://github.com/alinsjs/alins">Alins - 极致优雅的UI框架</a></p>
</p>

## 1. 快速使用

### 1.1 npm 引用

```
npm i disable-devtool
```

```js
import DisableDevtool from 'disable-devtool';

DisableDevtool();
```

### 1.2 script属性配置

```html
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
```

或者通过版本引用:

```html
<!--使用指定版本-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@x.x.x'></script>
<!--使用最新版本-->
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool@latest'></script>
```

### 1.3 误触发问题定位帮助

----

<details>
    <summary>如果您在使用过程中遇到问题，请点开我</summary>

因为设备、浏览器、运行环境众多，难免会有一些该库无法兼容的场景，此部分用于开发者自查问题，然后细节反馈到 issues，以帮助我们定位和解决bug

#### 1.3.1 探测器被错误地触发

对于部分情况下，如果没有打开控制台但是页面没关闭了或是跳转走了的问题，原因是某个探测器被错误地触发了，请使用以下代码定位是哪个探测器被误触发了：

```js
DisableDevtool({
    ondevtoolopen: (type) => {
        const info = 'devtool opened!; type =' + type;
        alert(info);
        // 如果担心阻塞页面 请使用 console.warn(info); 并打开控制台查看
    },
})
```

上述代码在使用脚本引用时需要这样使用

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
<script>
    DisableDevtool({
        ondevtoolopen: (type) => {
            const info = 'devtool opened!; type =' + type;
            alert(info); // 如果担心阻塞页面 请使用 console.warn(info); 并打开控制台查看
        },
    })
</script>
```

#### 1.3.2 探测器没有被触发

当通过任意方式打开了devtool，但是页面没有正确的关闭或者跳转时，首先请尝试打印以下内容，看看探测器是否在正常工作

```js
console.log(DisableDevtool.isRunning);
```

如果返回的是true，那么这就是一个不兼容的问题，原因是所有探测器都没有被触发，这种情况是比较棘手的，目前来看没有通用的定位方法

请提交一个issue，尽可能详细地提供您使用的浏览器版本、设备型号及版本、运行环境，最好是有截图或者演示地址，我们后续会进行相应的问题排查

</details>

----

## 2.功能

disable-devtool 可以禁用所有一切可以进入开发者工具的方法，防止通过开发者工具进行的 ‘代码搬运’

该库有以下特性:

1. 支持可配置是否禁用右键菜单
2. 禁用 f12 和 ctrl+shift+i 等快捷键
3. 支持识别从浏览器菜单栏打开开发者工具并关闭当前页面
4. 开发者可以绕过禁用 (url参数使用tk配合md5加密)
5. 多种监测模式，支持几乎所有浏览器（IE,360,qq浏览器,FireFox,Chrome,Edge...）
6. 高度可配置、使用极简、体积小巧
7. 支持npm引用和script标签引用(属性配置)
8. 识别真移动端与浏览器开发者工具设置插件伪造的移动端，为移动端节省性能
9.  支持识别开发者工具关闭事件
10. 支持可配置是否禁用选择、复制、剪切、粘贴功能
11. 支持识别 eruda 和 vconsole 调试工具
12. 支持挂起和恢复探测器工作
13. 支持配置ignore属性，用以自定义控制是否启用探测器
14. 支持配置iframe中所有父页面的开发者工具禁用

## 3. 使用

### 3.1 npm使用时的配置参数

推荐使用这种方式安装使用，使用script脚本可以被代理单独拦截掉从而无法执行

安装 disable-devtool

```
npm i disable-devtool
```

```js
import DisableDevtool from 'disable-devtool';

DisableDevtool(options);
```

#### 3.1.1 返回值

返回值 DisableDevtool 的返回值为如下类型

```ts
interface IDDResult {
    success: boolean; // 表示是否正常启用
    reason: string; // 未正常启用的原因
}
```

#### 3.1.2 参数

options中的参数与说明如下：

```ts
interface IConfig {
    md5?: string; // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
    url?: string; // 关闭页面失败时的跳转页面，默认值为localhost
    tkName?: string; // 绕过禁用时的url参数名称，默认为 ddtk
    ondevtoolopen?(type: DetectorType, next: Function): void; // 开发者面板打开的回调，启用时url参数无效，type 为监测模式，详见3.5， next函数是关闭当前窗口
    ondevtoolclose?(): void; // 开发者面板关闭的回调
    interval?: number; // 定时器的时间间隔 默认200ms
    disableMenu?: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime?: number; // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger?: boolean; // 是否在触发之后停止监控 默认为false， 在使用ondevtoolclose时该参数无效
    detectors?: Array<DetectorType>; // 启用的检测器 检测器详情见 3.5 默认为全部，建议使用全部
    clearLog?: boolean; // 是否每次都清除log
    disableSelect?: boolean; // 是否禁用选择文本 默认为false
    disableCopy?: boolean; // 是否禁用复制 默认为false
    disableCut?: boolean; // 是否禁用剪切 默认为false
    disablePaste: boolean; // 是否禁用粘贴 默认为false
    ignore?: (string|RegExp)[] | null | (()=>boolean); // 某些情况忽略禁用
    disableIframeParents?: boolean; // iframe中是否禁用所有父窗口
    timeOutUrl?: string; // 关闭页面超时跳转的url;
    rewriteHTML: string; // 检测到打开之后重写页面
}

enum DetectorType {
  Unknown = -1,
  RegToString = 0, // 根据正则检测
  DefineId, // 根据dom id检测
  Size, // 根据窗口尺寸检测
  DateToString, // 根据Date.toString 检测
  FuncToString, // 根据Function.toString 检测
  Debugger, // 根据断点检测，仅在ios chrome 真机情况下有效
  Performance, // 根据log大数据性能检测
  DebugLib, // 检测第三方调试工具 eruda 和 vconsole   
};
```

### 3.2 md5 与 tk 绕过禁用

该库中使用 key 与 md5 配合的方式使得开发者可以在线上绕过禁用。

流程如下：

先指定一个 key a（该值不要记录在代码中），使用 md5 加密得到一个值 b，将b作为 md5 参数传入，开发者在访问 url 的时候只需要带上url参数 ddtk=a，便可以绕过禁用。

disableDevtool对象暴露了 md5 方法，可供开发者加密时使用：

```js
DisableDevtool.md5('xxx');
```

### 3.3 script使用属性配置

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

注：

1. 如希望自动禁用，属性配置时必须要带上 `disable-devtool-auto` 属性
2. 属性配置都是可选的，字段与3.1中一致，区别是将驼峰形式改成横线分割
3. 该script标签建议放在body最底部
4. detectors 需要使用空格分割，如 detectors='1 2 3'

### 3.4 script不使用属性配置

```html
<script src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
<script>
    DisableDevtool({
        // 参数与3.1中一致
    })
</script>
```

### 3.5 监测模式

Disable-Devtool 有以下几种监测模式, DisableDevtool.DetectorType 为所有的监测模式枚举

```ts
enum DetectorType {
  Unknown = -1,
  RegToString = 0, // 根据正则检测
  DefineId, // 根据dom id检测
  Size, // 根据窗口尺寸检测 // 0.3.5版本后该探测器默认不启用
  DateToString, // 根据Date.toString 检测
  FuncToString, // 根据Function.toString 检测
  Debugger, // 根据断点检测，仅在ios chrome 真机情况下有效
  Performance, // 根据log大数据性能检测
  DebugLib, // 检测第三方调试工具
};
```

ondevtoolopen 事件的回调参数就是被触发的监测模式

可以在 ondevtoolopen 里执行业务逻辑，比如做数据上报、用户行为分析等

```ts
DisableDevtool({
    ondevtoolopen(type, next){
        alert('Devtool opened with type:' + type);
        next();
    }
});
```

### 3.6 其他 API

#### 3.6.1 isRunning

用于获取 DisableDevtool 是否正在运行中 (挂起或忽略状态也视为运行中，因为可以动态开启)

```js
DisableDevtool.isRunning;
```

#### 3.6.2 isSuspend

用于获取或设置 DisableDevtool 是否被挂起 (挂起状态所有的禁用都将暂时失效)

```js
DisableDevtool.isSuspend = true;
DisableDevtool.isSuspend = false;
```

#### 3.6.3 config.ignore

ignore 用于自定义某些忽略的场景

1. 传入数组

传入数组是支持 字符串和正则表达式，表示匹配链接中是否含有传入的内容，使用如下

```js
DisableDevtool({
    ignore: [
        '/user/login', // 当链接中含有该内容时禁用暂时被忽略
        /\/user\/[0-9]{6}/, // 当链接匹配该正则时禁用暂时被忽略
    ]
});
```

2. 传入函数

传入函数表示自定义判断条件，返回一个bool类型，使用如下

```js
DisableDevtool({
    ignore: () => {
        return userType === 'admin'; // 当是管理员时忽略禁用
    }
});
```

#### 3.6.4 version

用于获取 DisableDevtool 版本号

```js
DisableDevtool.version;
```