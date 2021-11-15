/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: tackchen
 * @LastEditTime: 2021-11-15 23:49:00
 * @FilePath: /disable-devtool/src/detector/debugger.js
 * @Description: Coding something
 */

import {registInterval} from '../interval';
import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
 
export default function detector () {
    registInterval(() => {
        const date = Date.now();
        (() => {debugger;})();
        if (Date.now() - date > 100) {
            triggerOnDevOpen(DETECTOR_TYPE.DEBUGGER);
        }
    });
}