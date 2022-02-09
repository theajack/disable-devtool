/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: tackchen
 * @LastEditTime: 2022-02-09 21:21:49
 * @FilePath: /disable-devtool/src/detector/debugger.js
 * @Description: Coding something
 */

import {DETECTOR_TYPE} from '../utils/constant';
import {registInterval} from '../utils/interval';
import {triggerOnDevOpen} from './detector';

export default function detector (isIOSChrome) {
    if (isIOSChrome) {
        const type = DETECTOR_TYPE.DEBUGGER;
        // 仅在 ios chrome 下生效
        registInterval(type, () => {
            const date = Date.now();
            (() => {debugger;})();
            if (Date.now() - date > 100) {
                triggerOnDevOpen(type);
            }
        });
    }
}