/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: tackchen
 * @LastEditTime: 2022-01-05 09:06:30
 * @FilePath: /disable-devtool/src/detector/debugger.js
 * @Description: Coding something
 */

import {registInterval} from '../utils/interval';
import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
 
export default function detector (isTrueIOSChrome) {
    if (isTrueIOSChrome) {
        // 仅在 ios chrome 下生效
        registInterval(() => {
            const date = Date.now();
            (() => {debugger;})();
            if (Date.now() - date > 100) {
                triggerOnDevOpen(DETECTOR_TYPE.DEBUGGER);
            }
        });
    }
}