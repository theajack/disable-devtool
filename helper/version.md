# Version Log:

## 0.0.1
1. 支持可配置是否禁用右键菜单
2. 禁用 f12 和 ctrl+shift+i 快捷键
3. 支持识别从浏览器菜单栏打开开发者工具并关闭当前页面
4. 开发者可以绕过禁用 (url参数使用tk配合md5加密)
5. 支持几乎所有浏览器
6. 高度可配置
7. 使用极简、体积小巧 (仅7kb)
8. 支持npm引用和script标签引用(属性配置)

## 0.0.2
1. 解决cdn文件无效的bug

## 0.0.3
1. 解决alert等原生方法会影响debug计时导致
2. 解决页面且后台会影响debug计时导致
3. 兼容ie，disableMenu参数在ie下无效，因为ie下右键会阻塞主进程，且无法监听
4. 增加config.stopIntervalTime 表示在移动端时取消监视的等待时长
5. 优化判断开发者工具打开的逻辑

## 0.0.4
1. 修改 webpack 打包配置

## 0.0.5
1. 优化onDevToolOpen事件触发逻辑

## 0.0.6
1. 对于标签属性配置，移除id='disable-devtool' 条件，使用 disable-devtool-auto属性
2. 修改readme

## 0.1.0
1. 修复firefox和qq浏览器下无效的问题
2. 启用 disableMenu 配置
3. 去除内部debug逻辑
4. 增加默认跳转的404页面
   
## 0.1.1
1. 增加history.back 之后跳转默认页的延迟
2. 优化ondeltoolopen 逻辑

## 0.1.2
1. 加上document的判断 以适应服务端渲染 npm 调用

## 0.1.3
1. 修复 disableMenu 参数无效的bug