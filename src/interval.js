import {config} from './config';
import {hackAlert, isPC, onPageShowHide} from './util';

let interval = null, timer = null;
let calls = [];

export function initInterval () {
    let _pause = false;
    let pause = () => {_pause = true;};
    let goon = () => {_pause = false;};
    hackAlert(pause, goon); // 防止 alert等方法触发了debug延迟计算
    onPageShowHide(goon, pause); // 防止切后台触发了debug延迟计算

    interval = window.setInterval(() => {
        if (_pause) return;
        calls.forEach(fn => {fn();});
    }, config.interval);
    // 两秒之后判断 如果不是pc去掉定时器interval，为了优化移动端的性能
    // 如果控制面板被打开了该定时器timer会被清除
    timer = setTimeout(() => {
        if (!isPC()) {
            clearInterval();
        }
    }, config.stopIntervalTime);
}

export function registInterval (fn) {
    calls.push(fn);
}

export function clearInterval () {
    window.clearInterval(interval);
}

export function clearTimeout () {
    window.clearTimeout(timer);
}