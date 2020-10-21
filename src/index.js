import {disableKeyAndMenu} from './key-menu';
import {initInterval, registInterval} from './interval';
import {closeWindow, getNowTime, getUrlParam} from './util';
import {mergeConfig, config} from './config';
import md5 from './md5';

let _onDevToolOpen = closeWindow;

export function disableDevtool (opts) {
    mergeConfig(opts);
    if (checkTk()) {
        return;
    }
    initInterval();
    disableKeyAndMenu();
    initDebugger();
    initDevTool();
}

export function onDevToolOpen () {
    _onDevToolOpen();
}

function checkTk () {
    if (config.md5) { // 启用了 md5
        let tk = getUrlParam(config.tkName);
        if (md5(tk) === config.md5) { // 命中tk
            return true;
        }
    }
    return false;
}

function initDebugger () {
    let last = getNowTime();
    registInterval(() => {
        eval('debugger');
        let now = getNowTime();
        if (now - last > 1200) {
            onDevToolOpen();
        } else {
            last = now;
        }
    });
}

function initDevTool () {
    const isFF = ~navigator.userAgent.indexOf('Firefox');
    let toTest = '';
    if (isFF) {
        toTest = /./;
        toTest.toString = function () {
            onDevToolOpen();
        };
    } else {
        toTest = new Image();
        toTest.__defineGetter__('id', function () {
            onDevToolOpen();
        });
    }
    registInterval(() => {
        console.log(toTest);
        console.clear && console.clear();
    });
}