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
import {now, IS} from 'src/utils/util';

export default class extends Detector {

  constructor () {
    super({
      type: DetectorType.Debugger,
      enabled: IS.iosChrome || IS.iosEdge,
    });
  }

  detect () {
    const date = now();
    (() => {debugger;})();
    if (now() - date > 100) {
      this.onDevToolOpen();
    }
  }
}