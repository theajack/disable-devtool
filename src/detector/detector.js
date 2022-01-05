/*
 * @Author: theajack
 * @Date: 2021-07-24 23:16:34
 * @LastEditor: theajack
 * @LastEditTime: 2022-01-06 00:09:02
 * @Description: Coding something
 */

import {config} from '../utils/config';
import RegToStringDetector from './reg-to-string';
import DefineIdDetector from './define-id';
import SizeDetector from './size';
import DateToStringDetector from './date-to-string';
import FuncToStringDetector from './func-to-string';
import DebuggerDetector from './debugger';
// import LogTimeDetector from './log-time'; // 不准确 容易误伤 故弃用
import {clearDDInterval, clearDDTimeout} from '../utils/interval';
import {closeWindow} from '../utils/close-window';
import {isIOSChrome} from '../utils/util';
import {isDevToolOpened, isLastStateOpened, markDevToolOpenState} from '../utils/open-state';

export const DETECTOR_TYPE = {
    UNKONW: -1,
    REG_TO_STRING: 0,
    DEFINE_ID: 1,
    SIZE: 2,
    DATE_TO_STRING: 3,
    FUNC_TO_STRING: 4,
    DEBUGGER: 5,
    // LOG_TIME: 6,
};

const Detectors = {
    [DETECTOR_TYPE.REG_TO_STRING]: RegToStringDetector,
    [DETECTOR_TYPE.DEFINE_ID]: DefineIdDetector,
    [DETECTOR_TYPE.SIZE]: SizeDetector,
    [DETECTOR_TYPE.DATE_TO_STRING]: DateToStringDetector,
    [DETECTOR_TYPE.FUNC_TO_STRING]: FuncToStringDetector,
    [DETECTOR_TYPE.DEBUGGER]: DebuggerDetector,
    // [DETECTOR_TYPE.LOG_TIME]: LogTimeDetector,
};

export function initDetectors () {
    // ! 判断是否是 ios chrome true时 禁用 date 和 func detector，因为会误伤。启用debugger detector兜底
    const typeArray = config.detectors === 'all' ?
        Object.keys(Detectors) : config.detectors;
    
    if (isIOSChrome) {
        typeArray.push(DETECTOR_TYPE.DEBUGGER); // 会debuger显示devtool, 仅在ios chrome 真机生效
    }
    
    typeArray.forEach(type => {
        if (Detectors[type]) {
            Detectors[type](isIOSChrome);
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
    config.ondevtoolopen(type, closeWindow);
    markDevToolOpenState(type);
}

export function checkOnDevClose () {
    if (
        typeof config.ondevtoolclose === 'function'
    ) {
        const lastStateOpen = isLastStateOpened();
        if (!isDevToolOpened() && lastStateOpen) {
            config.ondevtoolclose();
        }
    }
}