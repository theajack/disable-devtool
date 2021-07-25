/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:22
 * @LastEditor: theajack
 * @LastEditTime: 2021-07-25 16:35:51
 * @Description: Coding something
 */

import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
import {registInterval} from '../interval';

function logTime () {
    const d = new Date();
    for (let i = 0; i < 1000; i++) {
        console.log(1);
    }
    console.clear();
    if (new Date() - d > 40) {
        console.warn(new Date() - d);
        triggerOnDevOpen(DETECTOR_TYPE.LOG_TIME);
    }
}

export default function detector () {
    registInterval((time) => {
        if (time % 5 === 0) {
            logTime();
        }
    });
}