import {checkOnDevClose} from '../detector/detector';
import {config} from './config';
import {clearLog} from './log';
import {clearDevToolOpenState} from './open-state';
import {hackAlert, isPC, onPageShowHide} from './util';

let interval = null, timer = null;
const calls = [];
let time = 0;

export function initInterval () {
    let _pause = false;
    const pause = () => {_pause = true;};
    const goon = () => {_pause = false;};
    hackAlert(pause, goon); // 防止 alert等方法触发了debug延迟计算
    onPageShowHide(goon, pause); // 防止切后台触发了debug延迟计算

    interval = window.setInterval(() => {
        if (_pause) return;
        calls.forEach(({type, handle}) => {
            clearDevToolOpenState(type);
            handle(time++);
        });
        clearLog();
        checkOnDevClose();
    }, config.interval);
    // stopIntervalTime 之后判断 如果不是pc去掉定时器interval，为了优化移动端的性能
    // 如果控制面板被打开了该定时器timer会被清除
    timer = setTimeout(() => {
        if (!isPC()) {
            clearDDInterval();
        }
    }, config.stopIntervalTime);
}

export function registInterval (type, handle) {
    calls.push({type, handle});
}

export function clearDDInterval () {
    window.clearInterval(interval);
}

export function clearDDTimeout () {
    window.clearTimeout(timer);
}