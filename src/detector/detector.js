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
import {isDevToolOpened, isLastStateOpened, markDevToolOpenState} from '../utils/open-state';
import {processDetectorEnableStatus} from './enable';
import {DETECTOR_TYPE} from '../utils/constant';

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
    const typeArray = config.detectors === 'all' ?
        Object.keys(Detectors) : config.detectors;
    
    typeArray.forEach(type => {
        processDetectorEnableStatus(type, Detectors[type]);
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