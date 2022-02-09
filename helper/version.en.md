# Version Log:

## 0.0.1
1. Support configurable whether to disable the right-click menu
2. Disable f12 and ctrl+shift+i shortcuts
3. Support recognition to open the developer tools from the browser menu bar and close the current page
4. Developers can bypass the disabling (use tk and md5 encryption for url parameters)
5. Support almost all browsers
6. Highly configurable
7. Minimal use, small size (only 7kb)
8. Support npm reference and script tag reference (attribute configuration)

## 0.0.2
1. Solve the bug of invalid CDN file

## 0.0.3
1. Solve the problem of native methods such as alert that will affect debug timing
2. Resolve the page and the background will affect the debug timing.
3. Compatible with ie, the disableMenu parameter is invalid under ie, because the right-click under ie will block the main process and cannot monitor
4. Add config.stopIntervalTime to indicate the waiting time for canceling monitoring on the mobile terminal
5. Optimize the logic of judging the opening of the developer tool

## 0.0.4
1. Modify webpack packaging configuration

## 0.0.5
1. Optimize onDevToolOpen event trigger logic

## 0.0.6
1. For the label attribute configuration, remove the id='disable-devtool' condition and use the disable-devtool-auto attribute
2. Modify the readme

## 0.1.0
1. Fix the invalid problem under firefox and qq browser
2. Enable disableMenu configuration
3. Remove internal debug logic
4. Add the default redirect 404 page
   
## 0.1.1
1. Increase the delay of jumping to the default page after history.back
2. Optimize ondeltoolopen logic

## 0.1.2
1. Add the judgment of the document to adapt to the server-side rendering npm call

## 0.1.3
1. Fix the bug that disableMenu parameter is invalid
   
## 0.1.4
1. Add detector, add multiple monitoring modes
2. Use logTime mode, compatible with mac and linux
3. Add the clearIntervalWhenDevOpenTrigger parameter
4. ondevtoolopen adds monitoring mode callback parameters

## 0.1.5
1. Remove the log-time monitoring type (because of inaccuracy)
   
## 0.1.6 - 0.1.7
1. Add DateToString monitoring type
2. Add FuncToString monitoring type
3. Add detectors configuration
4. Fix ios 15 accidental injury problem

## 0.1.8
1. Disable macos option+commond+i
2. Delete some debugging code and useless code
3. Modify the event model

## 0.1.9
1. Fix the bug of accidental injury in IFrame

## 0.1.10
1. Fix the problem that sizeDetector is accidentally injured in browser zoom mode

## 0.1.11
1. Fix the accidental injury caused by the third-party hack console.log method
## 0.1.12
1. Add the second parameter of config.ondevtoolopen next
2. Added shortcut key operations for prohibiting reviewing elements and saving web pages
3. Refactor the code
4. Fix the problem caused by the method on the console cannot be cached by ie

## 0.2.1 - 0.2.2
1. Add ondevtoolclose configuration
2. Add isDevToolOpened api
3. Fix the accidental injury problem of ios mobile chrome
4. Added a debug page

## 0.2.3
1. Opening the sidebar under edge will cause accidental injury, so disable sizeDetector under edge
2. Increase the clearLog parameter to control whether the console is required for each situation, the default is true