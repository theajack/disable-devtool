/*
 * @Author: theajack
 * @Date: 2021-07-24 23:16:34
 * @LastEditor: theajack
 * @LastEditTime: 2021-07-25 17:07:04
 * @Description: Coding something
 */

import {config} from '../config';
import ToStringDetector from './to-string';
import DefineIdDetector from './define-id';
import SizeDetector from './size';
import LogTimeDetector from './log-time';
import {clearDDInterval, clearDDTimeout} from '../interval';

const detectorList = [];

export const DETECTOR_TYPE = {
    UNKONW: -1,
    TO_STRING: 0,
    DEFINE_ID: 1,
    SIZE: 2,
    LOG_TIME: 3,
};

export function registDetector (detector) {
    detectorList.push(detector);
}

export function initDetectors () {
    ToStringDetector();
    DefineIdDetector();
    SizeDetector();
    LogTimeDetector();
}

export function triggerOnDevOpen (type = DETECTOR_TYPE.UNKONW) {
    console.warn(`You ar not allow to use DEVTOOL! 【type = ${type}】`);
    if (config.clearIntervalWhenDevOpenTrigger) {
        clearDDInterval();
    }
    clearDDTimeout();
    config.ondevtoolopen(type);
}