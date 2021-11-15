import {config} from './config';
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
        calls.forEach(fn => {fn(time++);});
        console.clear();
    }, config.interval);
    // stopIntervalTime 之后判断 如果不是pc去掉定时器interval，为了优化移动端的性能
    // 如果控制面板被打开了该定时器timer会被清除
    timer = setTimeout(() => {
        if (!isPC()) {
            clearDDInterval();
        }
    }, config.stopIntervalTime);
}

export function registInterval (fn) {
    calls.push(fn);
}

export function clearDDInterval () {
    window.clearInterval(interval);
}

export function clearDDTimeout () {
    window.clearTimeout(timer);
}