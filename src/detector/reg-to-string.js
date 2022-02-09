/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:01
 * @LastEditor: theajack
 * @LastEditTime: 2022-02-09 21:15:09
 * @Description: Coding something
 */

import {registInterval} from '../utils/interval';
import {isFirefox, isQQBrowser} from '../utils/util';
import {log} from '../utils/log';
import {triggerOnDevOpen} from './detector';
import {DETECTOR_TYPE} from '../utils/constant';
 
// 这个方法在chrome 中无论是否打开都会触发
export default function detector () {
    const type = DETECTOR_TYPE.REG_TO_STRING;
    let lastTime = 0;
    const reg = /./;
    log(reg);
    reg.toString = function () {
        if (isQQBrowser) { // ! qq浏览器在控制台没有打开的时候也会触发 打开的时候会连续触发两次 使用这个来判断
            const time = new Date().getTime();
            if (lastTime && time - lastTime < 100) {
                triggerOnDevOpen(type);
            } else {
                lastTime = time;
            }
        } else if (isFirefox) {
            triggerOnDevOpen(type);
        }
        return '';
    };

    registInterval(type, () => {
        log(reg);
    });
}