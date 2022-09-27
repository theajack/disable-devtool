/*
 * @Author: tackchen
 * @Date: 2022-09-27 20:23:12
 * @Description: Coding something
 */

import {DETECTOR_TYPE} from '../utils/constant';
import {registInterval} from '../utils/interval';
import {clearLog, log, table} from '../utils/log';
import {triggerOnDevOpen} from './detector';

export default function detector () {
    const type = DETECTOR_TYPE.PERFORMANCE;

    let largeObjectArray = null;
    let maxPrintTime = 0;
    
    const calcTablePrintTime = () => {
        const start = Date.now();
        table(largeObjectArray);
        return Date.now() - start;
    };
    
    const calcLogPrintTime = () => {
        const start = Date.now();

        log(largeObjectArray);

        return Date.now() - start;
    };

    const checkIsOpen = () => {
      
        if (largeObjectArray === null) {
            largeObjectArray = createLargeObjectArray();
        }

        const tablePrintTime = calcTablePrintTime();
        const logPrintTime = calcLogPrintTime();
        maxPrintTime = Math.max(maxPrintTime, logPrintTime);

        clearLog();

        if (tablePrintTime === 0) return false;
        if (maxPrintTime === 0) return false;

        if (tablePrintTime > maxPrintTime * 10) {
            triggerOnDevOpen(type);
        }
    };

    registInterval(type, checkIsOpen);
}

function createLargeObject () {
    const largeObject = {};
    for (let i = 0; i < 500; i++) {
        largeObject[`${i}`] = `${i}`;
    }
    return largeObject;
}

function createLargeObjectArray () {
    const largeObject = createLargeObject();
    const largeObjectArray = [];

    for (let i = 0; i < 50; i++) {
        largeObjectArray.push(largeObject);
    }

    return largeObjectArray;
}

