/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-28 00:05:24
 * @FilePath: /disable-devtool/src/detector/func-to-string.js
 * @Description: Coding something
 */

import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';
import {clearLog, log} from 'src/utils/log';
import {isIOSChrome, isIOSEdge} from 'src/utils/util';

export default class extends Detector {
  count: number;
  func: Function;

  constructor () {
    super({
      type: DetectorType.FuncToString,
      enabled: (!isIOSChrome && !isIOSEdge),
    });
  }

  init () {
    this.count = 0;
    this.func = () => {};
    this.func.toString = () => {
      this.count ++;
      return '';
    };
  }

  detect () {
    this.count = 0;
    log(this.func);
    clearLog();
    if (this.count >= 2) {
      this.onDevToolOpen();
    }
  }
}