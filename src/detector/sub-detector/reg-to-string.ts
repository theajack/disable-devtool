/*
 * @Author: tackchen
 * @Date: 2022-09-27 20:23:12
 * @Description: Coding something
 */

import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';
import {log} from 'src/utils/log';
import {IS} from 'src/utils/util';

export default class extends Detector {
  lastTime: number;
  reg: RegExp;
  
  constructor () {
    super({
      type: DetectorType.RegToString,
      enabled: (IS.qqBrowser || IS.firefox),
    });
  }

  init () {
    this.lastTime = 0;
    this.reg = /./;
    log(this.reg);
    this.reg.toString = () => {
      if (IS.qqBrowser) { // ! qq浏览器在控制台没有打开的时候也会触发 打开的时候会连续触发两次 使用这个来判断
        const time = new Date().getTime();
        if (this.lastTime && time - this.lastTime < 100) {
          this.onDevToolOpen();
        } else {
          this.lastTime = time;
        }
      } else if (IS.firefox) {
        this.onDevToolOpen();
      }
      return '';
    };
  }

  detect () {
    log(this.reg);
  }
};