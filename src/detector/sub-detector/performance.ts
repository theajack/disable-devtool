/*
 * @Author: tackchen
 * @Date: 2022-09-27 20:23:12
 * @Description: Coding something
 */

import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';
import {clearLog, log, table} from 'src/utils/log';
import {calculateTime, isChrome, createLargeObjectArray} from 'src/utils/util';

export default class extends Detector {
  largeObjectArray: any;
  maxPrintTime: number;

  constructor () {
    super({
      type: DetectorType.Performance,
      enabled: isChrome
    });
  }

  init () {
    this.maxPrintTime = 0;
    this.largeObjectArray = createLargeObjectArray();
  }

  detect () {
    const tablePrintTime = calculateTime(() => {table(this.largeObjectArray);});
    const logPrintTime = calculateTime(() => {log(this.largeObjectArray);});
    this.maxPrintTime = Math.max(this.maxPrintTime, logPrintTime);

    clearLog();

    if (tablePrintTime === 0 || this.maxPrintTime === 0) return false;

    if (tablePrintTime > this.maxPrintTime * 10) {
      this.onDevToolOpen();
    }
  }

};