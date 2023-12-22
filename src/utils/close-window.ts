/*
 * @Author: tackchen
 * @Date: 2021-12-24 15:14:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-22 09:57:58
 * @FilePath: /disable-devtool/src/close-window.js
 * @Description: Coding something
 */
import {config} from './config';
// import {clearDDInterval} from './interval';

export function closeWindow () {
  // clearDDInterval();
  if (config.url) {
    window.location.href = config.url;
  } else if (config.rewriteHTML) {
    try {
      document.documentElement.innerHTML = config.rewriteHTML;
    } catch (e) {
      // for 'TrustedHTML' assignment
      document.documentElement.innerText = config.rewriteHTML;
    }
  } else {
    try {
      window.opener = null;
      window.open('', '_self');
      // 需要是由js跳转到这个页面才可以关闭这个页面
      window.close();
      window.history.back();
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      // 否则执行跳转到 url
      window.location.href = config.timeOutUrl || `https://theajack.github.io/disable-devtool/404.html?h=${encodeURIComponent(location.host)}`;
    }, 500);
  }
}
