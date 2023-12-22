<!--
 * @Author: tackchen
 * @Date: 2022-08-28 20:56:33
 * @Description: Coding something
-->
# Version Log:

## 0.3.7

1. 修复移动端浏览器长按不弹出复制等按钮
2. 增加 rewriteHTML 配置
3. 移除 closeWindow 中的 clearDDInterval 调用
   
## 0.3.6

1. fix google lighthouse 新版本没有放行
2. fix 移动端调试工具5s之后被放行
3. 将interval默认时间设置为500ms
   
## 0.3.5

1. 修复pc端ios移动端中调试模式不起作用的问题
2. 去除sizeDetector的默认启用
3. 增加timeOutUrl，用来处理关闭页面超时的跳转
4. 增加disableDevtool重复启用判断，增加返回值
5. 优化seobot的判断

## 0.3.4

1. 修复ios edge浏览器中的误检测问题

## 0.3.3

1. 修复在非浏览器环境引入可能报错的问题
2. 增加seo保护功能，并增加 config.seo 参数，用来控制是否需要开启，默认为true
   
## 0.3.2

1. 增加 isRunning 属性，返回检测器是否正在运行
2. 增加 isSuspend 属性，设置检测器挂起 或 检测是否被挂起
3. 增加 ignore 配置参数，用户匹配某些url不启用检测器
4. 修复iframe中，父窗口可以打开控制台的bug，并新增disableIframeParents参数控制该行为
5. 修复默认跳转链接失效的问题

## 0.3.1 

1. 修复ios chrome中的误识别

## 0.3.0

1. ts重构，使用esbuild与rollup
2. 增加 disablePaste 参数，禁用粘贴功能
3. 增加 检测第三方调试工具 eruda和vconsole

## 0.2.6
1. 增加performance模式，修复新版本chrome不兼容的bug

## 0.2.5
1. 增加disableSelect, disableCopy, disableCut配置
   
## 0.2.4
1. 修复iosEdge下会误伤的情况
   
## 0.2.3
1. edge 下打开侧边栏会误伤，所以禁用edge下的sizeDetector
2. 增加clearLog参数，控制是否需要每次情况控制台，默认为true

## 0.2.1 - 0.2.2
1. 增加 ondevtoolclose 配置
2. 增加 isDevToolOpened api
3. 修复 ios mobile chrome 的误伤问题
4. 增加了一个debug页面

## 0.1.12
1. 增加 config.ondevtoolopen 第二个参数 next
2. 增加 禁止审查元素和保存网页的快捷键操作
3. 重构代码
4. 修复ie不能缓存console上的方法导致的问题

## 0.1.11
1. 修复第三方 hack console.log方法 导致的误伤

## 0.1.10
1. 修复sizeDetector在浏览器缩放模式下误伤的问题
   
## 0.1.9
1. 修复IFrame中误伤的bug

## 0.1.8
1. 禁用 macos option+commond+i
2. 删除部分调试代码与无用代码
3. 修改事件模型
   
## 0.1.6 - 0.1.7
1. 增加 DateToString 监测类型
2. 增加 FuncToString 监测类型
3. 增加 detectors 配置
4. 修复ios 15误伤问题 

## 0.1.5
1. 去掉log-time监测类型（因为不准确）

## 0.1.4
1. 增加 detector，增加多种监测模式
2. 使用logTime模式兜底，兼容mac，linux
3. 增加 clearIntervalWhenDevOpenTrigger 参数
4. ondevtoolopen 增加 监测模式 回调参数

## 0.1.3
1. 修复 disableMenu 参数无效的bug

## 0.1.2
1. 加上document的判断 以适应服务端渲染 npm 调用
   
## 0.1.1
1. 增加history.back 之后跳转默认页的延迟
2. 优化ondeltoolopen 逻辑

## 0.1.0
1. 修复firefox和qq浏览器下无效的问题
2. 启用 disableMenu 配置
3. 去除内部debug逻辑
4. 增加默认跳转的404页面

## 0.0.6
1. 对于标签属性配置，移除id='disable-devtool' 条件，使用 disable-devtool-auto属性
2. 修改readme

## 0.0.5
1. 优化onDevToolOpen事件触发逻辑

## 0.0.4
1. 修改 webpack 打包配置

## 0.0.3
1. 解决alert等原生方法会影响debug计时导致
2. 解决页面且后台会影响debug计时导致
3. 兼容ie，disableMenu参数在ie下无效，因为ie下右键会阻塞主进程，且无法监听
4. 增加config.stopIntervalTime 表示在移动端时取消监视的等待时长
5. 优化判断开发者工具打开的逻辑

## 0.0.2
1. 解决cdn文件无效的bug

## 0.0.1
1. 支持可配置是否禁用右键菜单
2. 禁用 f12 和 ctrl+shift+i 快捷键
3. 支持识别从浏览器菜单栏打开开发者工具并关闭当前页面
4. 开发者可以绕过禁用 (url参数使用tk配合md5加密)
5. 支持几乎所有浏览器
6. 高度可配置
7. 使用极简、体积小巧 (仅7kb)
8. 支持npm引用和script标签引用(属性配置)