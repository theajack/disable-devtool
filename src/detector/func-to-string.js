/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 20:46:44
 * @FilePath: /disable-devtool/src/detector/func-to-string.js
 * @Description: Coding something
 */

// // ! 会误伤ios mobile chrome 可能会误伤谷歌搜索seo 故放弃使用

import {registInterval} from '../utils/interval';
import {triggerOnDevOpen} from './detector';
import {log, clearLog} from '../utils/log';
import {DETECTOR_TYPE} from '../utils/constant';
 
export default function detector () {
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