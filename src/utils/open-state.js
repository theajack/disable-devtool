/*
 * @Author: tackchen
 * @Date: 2022-01-05 22:27:40
 * @LastEditors: tackchen
 * @LastEditTime: 2022-02-09 21:23:38
 * @FilePath: /disable-devtool/src/utils/open-state.js
 * @Description: Coding something
 */

import {DETECTOR_TYPE} from '../utils/constant';

let isLastStateOpenedBool = false;

export function isLastStateOpened () {
    return isLastStateOpenedBool;
}

const OpenState = {};

for (const k in DETECTOR_TYPE) {
    OpenState[DETECTOR_TYPE[k]] = false;
}

export function markDevToolOpenState (type) {
    OpenState[type] = true;
}

export function clearDevToolOpenState (type) {
    OpenState[type] = false;
}

export function isDevToolOpened () {
    for (const key in OpenState) {
        if (OpenState[key]) {
            isLastStateOpenedBool = true;
            return true;
        }
    }
    isLastStateOpenedBool = false;
    return false;
}
