/*
 * @Author: tackchen
 * @Date: 2022-01-05 22:27:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-28 00:24:14
 * @FilePath: /disable-devtool/src/utils/open-state.js
 * @Description: Coding something
 */

import {DetectorType} from 'src/utils/enum';
import {config} from './config';

let isLastStateOpenedBool = false;

const OpenState: {
  [prop in DetectorType]?: boolean;
} = {};

export function markDevToolOpenState (type: DetectorType) {
  OpenState[type] = true;
}

export function clearDevToolOpenState (type: DetectorType) {
  OpenState[type] = false;
}

export function isDevToolOpened () {
  for (const key in OpenState) {
    if (OpenState[key as unknown as DetectorType]) {
      isLastStateOpenedBool = true;
      return true;
    }
  }
  isLastStateOpenedBool = false;
  return false;
}

export function checkOnDevClose () {
  if (
    typeof config.ondevtoolclose === 'function'
  ) {
    const isLastOpen = isLastStateOpenedBool; // 缓存一下上一次结果
    if (!isDevToolOpened() && isLastOpen) {
      config.ondevtoolclose();
    }
  }
}