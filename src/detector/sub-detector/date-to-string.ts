/*
 * @Author: tackchen
 * @Date: 2022-09-27 23:05:40
 * @Description: Coding something
 */

import {clearLog, log} from '../../utils/log';
import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';

export default class extends Detector {

  date: Date;
  count: 0;

  constructor () {
    super({
      type: DetectorType.DateToString
    });
  }

  init () {
    this.count = 0;
    this.date = new Date();
    this.date.toString = () => {
      this.count ++;
      return '';
    };
  }

  detect () {
    this.count = 0;
    log(this.date);
    clearLog();
    if (this.count >= 2) {
      this.onDevToolOpen();
    }
  }
}