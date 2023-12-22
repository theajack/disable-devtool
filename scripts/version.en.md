<!--
 * @Author: tackchen
 * @Date: 2022-08-28 20:56:33
 * @Description: Coding something
-->
# Version Log:

## 0.3.7

1. Fix the movement of the mobile browser long press and not pop up the copy and other buttons
2. Add REWRITEHTML configuration
3. Remove CleardDinterval calls in Closewindow

## 0.3.6

1. Fix The new version of Google Lighthouse is not released
2. Fix The mobile debugging tool is allowed after 5s
3. Set the interval default time to 500ms

## 0.3.5

1. Fix the problem that the debugging mode in the PC iOS mobile terminal does not work
2. Remove the default enablement of sizeDetector
3. Add timeOutUrl to handle the jump that closes the page timeout
4. Add disableDevtool to repeatedly enable judgment and increase the return value
5. Optimize the judgment of seobot
   
## 0.3.4

Fix false detection issue in iOS Edge browser

## 0.3.3

1. Fixed the issue that an error may be reported in a non-browser environment
2. Add SEO protection function, and add config.seo parameter to control whether it needs to be enabled, the default is true
   
## 0.3.2

1. Add the isRunning property to return whether the detector is running
2. Add the isSuspend property to set Detector Hang or Detect whether it is suspended
3. Add the ignore configuration parameter, users matching certain URLs do not enable detectors
4. Fixed the bug that the parent window can open the console in the iframe, and added the disableIframeParents parameter to control the behavior
5. Fixed the issue that the default redirect link is invalid
   
## 0.3.1

1. Fixed false recognition in ios Chrome

## 0.3.0

1. ts reconstruction, using esbuild and rollback
2. Add the disablePaste parameter to disable the paste function
3. Add third-party debugging tools eruda and vconsole

## 0.2.6
1. Add the performance mode and fix the bug that the new version of chrome is incompatible

## 0.2.5
1. Add disableSelect, disableCopy, disableCut configuration
   
## 0.2.4
1. Fix the case of accidental injury under iosEdge
   
## 0.2.3
1. Opening the sidebar under edge will cause accidental injury, so disable sizeDetector under edge
2. Increase the clearLog parameter to control whether the console is required for each situation, the default is true

## 0.2.1 - 0.2.2
1. Add ondevtoolclose configuration
2. Add isDevToolOpened api
3. Fix the accidental injury problem of ios mobile chrome
4. Added a debug page

## 0.1.12
1. Add the second parameter next of config.ondevtoolopen
2. Add shortcut key operations for prohibiting review elements and saving webpages
3. Refactor the code
4. Fix the problem that ie cannot cache the methods on the console

## 0.1.11
1. Fix the accidental injury caused by the third-party hack console.log method

## 0.1.10
1. Fix the problem that sizeDetector accidentally hurts in browser zoom mode
   
## 0.1.9
1. Fix the bug of accidental injury in IFrame

## 0.1.8
1. Disable macos option+commond+i
2. Delete some debug code and useless code
3. Modify the event model
   
## 0.1.6 - 0.1.7
1. Add DateToString monitoring type
2. Add FuncToString monitoring type
3. Add detectors configuration
4. Fix ios 15 accidental injury problem

## 0.1.5
1. Remove the log-time monitoring type (because of inaccuracy)

## 0.1.4
1. Add detector, add multiple monitoring modes
2. Use logTime mode to get the bottom line, compatible with mac, linux
3. Add clearIntervalWhenDevOpenTrigger parameter
4. ondevtoolopen adds monitoring mode callback parameter

## 0.1.3
1. Fix the bug that disableMenu parameter is invalid

## 0.1.2
1. Add the judgment of the document to adapt to the server-side rendering npm call
   
## 0.1.1
1. Increase the delay of jumping to the default page after history.back
2. Optimize ondeltoolopen logic

## 0.1.0
1. Fix the invalid problem under firefox and qq browsers
2. Enable disableMenu configuration
3. Remove internal debug logic
4. Add the default 404 page to jump to

## 0.0.6
1. For tag attribute configuration, remove the id='disable-devtool' condition and use the disable-devtool-auto attribute
2. Modify the readme

## 0.0.5
1. Optimize onDevToolOpen event trigger logic

## 0.0.4
1. Modify the webpack packaging configuration

## 0.0.3
1. Solve the problem that native methods such as alert will affect the debug timing.
2. Solve the page and the background will affect the debug timing.
3. Compatible with ie, the disableMenu parameter is invalid under ie, because the right button under ie will block the main process and cannot monitor
4. Increase config.stopIntervalTime to indicate the waiting time for canceling monitoring on the mobile terminal
5. Optimize the logic for judging the opening of developer tools

## 0.0.2
1. Solve the bug of invalid cdn file

## 0.0.1
1. Support configurable whether to disable the right-click menu
2. Disable f12 and ctrl+shift+i shortcuts
3. Support recognition to open developer tools from browser menu bar and close the current page
4. Developers can bypass the disable (url parameters are encrypted with tk and md5)
5. Support almost all browsers
6. Highly configurable
7. Minimal use and small size (only 7kb)
8. Support npm reference and script tag reference (property configuration)