/*
 * @Author: tackchen
 * @Date: 2021-11-15 22:26:57
 * @LastEditors: tackchen
 * @LastEditTime: 2021-11-15 23:49:07
 * @FilePath: /disable-devtool/src/detector/func-to-string.js
 * @Description: Coding something
 */

import {registInterval} from '../interval';
import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
 
export default function detector () {
    let count = 0;
    const func = () => {};
    func.toString = () => {
        count ++;
        return '';
    };

    const checkIsOpen = () => {
        count = 0;
        console.log(func);
        console.clear();
        if (count >= 2) {
            triggerOnDevOpen(DETECTOR_TYPE.FUNC_TO_STRING);
        }
    };

    registInterval(checkIsOpen);
}