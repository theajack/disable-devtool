/*
 * @Author: tackchen
 * @Date: 2022-09-27 20:23:12
 * @Description: Coding something
 */

import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';
import {clearLog, table} from 'src/utils/log';
import {calculateTime, IS, createLargeObjectArray} from 'src/utils/util';

export default class extends Detector {
  largeObjectArray: any;
  maxPrintTime: number;
  private count: number = 0;

  constructor () {
    super({
      type: DetectorType.Performance,
      enabled: IS.chrome || !IS.mobile,
    });
  }

  init () {
    this.maxPrintTime = 0;
    this.largeObjectArray = createLargeObjectArray();
  }

  detect () {
    const tablePrintTime = calculateTime(() => {table(this.largeObjectArray);});
    const jsBaselineTime = calculateTime(() => {JSON.stringify(this.largeObjectArray);});
    this.maxPrintTime = Math.max(this.maxPrintTime, jsBaselineTime);

    clearLog();

    if (tablePrintTime === 0 || this.maxPrintTime === 0) return false;

    if (tablePrintTime > this.maxPrintTime * 10) {
      if (this.count >= 2) {
        this.onDevToolOpen();
      } else {
        this.count ++;
        this.detect();
      }
    }
  }

};