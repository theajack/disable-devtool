/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
/*
 * @Author: tackchen
 * @Date: 2022-09-27 23:05:40
 * @Description: Coding something
 */

import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';
import {log} from 'src/utils/log';

export default class extends Detector {
  div: HTMLElement;

  constructor () {
    super({
      type: DetectorType.DefineId,
    });
  }

  init () {
    this.div = document.createElement('div');
    (this.div as any).__defineGetter__('id', () => {
      this.onDevToolOpen();
    });
    Object.defineProperty(this.div, 'id', {
      get: () => {
        this.onDevToolOpen();
      },
    });
  }

  detect () {
    log(this.div);
  }
}