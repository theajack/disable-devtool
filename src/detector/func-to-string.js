/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: tackchen
 * @LastEditTime: 2022-01-06 00:07:54
 * @FilePath: /disable-devtool/src/detector/func-to-string.js
 * @Description: Coding something
 */

// // ! 会误伤ios mobile chrome 可能会误伤谷歌搜索seo 故放弃使用

import {registInterval} from '../utils/interval';
import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
import {log, clearLog} from '../utils/log';
 
export default function detector (isIOSChrome) {
    if (isIOSChrome) return;
    const type = DETECTOR_TYPE.FUNC_TO_STRING;
    let count = 0;
    const func = () => {};
    func.toString = () => {
        count ++;
        return '';
    };

    const checkIsOpen = () => {
        count = 0;
        log(func);
        clearLog();
        if (count >= 2) {
            triggerOnDevOpen(type);
        }
    };

    registInterval(type, checkIsOpen);
}