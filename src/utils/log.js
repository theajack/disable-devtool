/*
 * @Author: tackchen
 * @Date: 2021-12-24 13:18:23
 * @LastEditors: tackchen
 * @FilePath: /disable-devtool/src/utils/log.js
 * @Description: Coding something
 */
import {config} from './config';
import {isIE} from './util';

const console = window.console || {
    log: function () {
        return;
    }
};

export const log = (() => {
    // ie 不支持缓存使用 log等方法
    return isIE ? ((...args) => {return console.log(...args);}) : console.log;
})();

const clearLogFunc = (() => {
    // ie 不支持缓存使用 log等方法
    return isIE ? (() => {return console.clear();}) : console.clear;
})();

export function clearLog () {
    if (config.clearLog)
        clearLogFunc();
}
