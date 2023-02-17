/*
 * @Author: tackchen
 * @Date: 2021-12-24 13:18:23
 * @Description: Coding something
 */

import {config} from './config';
import {IS} from './util';

const console = window.console || {
  log: function () {
    return;
  },
  table: function () {
    return;
  },
  clear: function () {
    return;
  }
};

export let log: (...data: any[]) => void;
export let table: (...data: any[]) => void;
let clear: () => void;

export function initLogs () {
  if (IS.ie) {
    // ie 不支持缓存使用 log等方法
    log = (...args: any[]) => {return console.log(...args);};
    table = (...args: any[]) => {return console.table(...args);};
    clear = () => {return console.clear();};
  } else {
    log = console.log;
    table = console.table;
    clear = console.clear;
  }
}

export function clearLog () {
  if (config.clearLog)
    clear();
}
