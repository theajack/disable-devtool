import {config} from './config';
import {isPC} from './util';

let interval = null, timer = null;
let calls = [];

export function initInterval () {
    interval = window.setInterval(() => {
        calls.forEach(fn => {fn();});
    }, config.interval);
    // 两秒之后判断 如果不是pc去掉定时器interval，为了优化移动端的性能
    // 如果控制面板被打开了该定时器timer会被清除
    timer = setTimeout(() => {
        if (!isPC()) {
            clearInterval();
        }
    }, 2000);
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