/*
 * @Author: tackchen
 * @Date: 2022-09-28 20:56:01
 * @Description: 识别第三方开发者工具
 */
 
import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';

export default class extends Detector {

  constructor () {
    super({
      type: DetectorType.DebugLib
    });
  }

  init () {}

  detect () {
    if (
      // eruda 检测
      (window as any).eruda?._devTools?._isShow === true ||
      // vconsole 检测
      (!!(window as any)._vcOrigConsole && !!window.document.querySelector('#__vconsole.vc-toggle'))
    ) {
      this.onDevToolOpen();
    }
  }
  static isUsing () {
    return !!(window as any).eruda || !!(window as any)._vcOrigConsole;
  }
}