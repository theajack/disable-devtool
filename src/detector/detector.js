/*
 * @Author: theajack
 * @Date: 2021-07-24 23:16:34
 * @LastEditor: theajack
 * @LastEditTime: 2021-11-16 08:48:48
 * @Description: Coding something
 */

import {config} from '../config';
import RegToStringDetector from './reg-to-string';
import DefineIdDetector from './define-id';
import SizeDetector from './size';
import DateToStringDetector from './date-to-string';
import FuncToStringDetector from './func-to-string';
// import DebuggerDetector from './debugger'; // 会debuger显示devtool
// import LogTimeDetector from './log-time'; // 不准确 容易误伤
import {clearDDInterval, clearDDTimeout} from '../interval';

const detectorList = [];

export const DETECTOR_TYPE = {
    UNKONW: -1,
    REG_TO_STRING: 0,
    DEFINE_ID: 1,
    SIZE: 2,
    DATE_TO_STRING: 3,
    FUNC_TO_STRING: 4,
    // DEBUGGER: 5,
    // LOG_TIME: 6,
};

const Detectors = {
    [DETECTOR_TYPE.REG_TO_STRING]: RegToStringDetector,
    [DETECTOR_TYPE.DEFINE_ID]: DefineIdDetector,
    [DETECTOR_TYPE.SIZE]: SizeDetector,
    [DETECTOR_TYPE.DATE_TO_STRING]: DateToStringDetector,
    [DETECTOR_TYPE.FUNC_TO_STRING]: FuncToStringDetector,
    // [DETECTOR_TYPE.DEBUGGER]: DebuggerDetector,
};

export function registDetector (detector) {
    detectorList.push(detector);
}

export function initDetectors () {
    const typeArray = config.detectors === 'all' ?
        Object.keys(Detectors) : config.detectors;

    typeArray.forEach(type => {
        if (Detectors[type]) {
            Detectors[type]();
        }
    });
}

export function triggerOnDevOpen (type = DETECTOR_TYPE.UNKONW) {
    console.warn(`You ar not allow to use DEVTOOL! 【type = ${type}】`);
    // alert(`You ar not allow to use DEVTOOL! 【type = ${type}】`);
    if (config.clearIntervalWhenDevOpenTrigger) {
        clearDDInterval();
    }
    clearDDTimeout();
    config.ondevtoolopen(type);
}