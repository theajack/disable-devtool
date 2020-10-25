import {disableKeyAndMenu} from './key-menu';
import {initInterval, registInterval, clearTimeout} from './interval';
import {formatName, getNowTime, getUrlParam} from './util';
import {mergeConfig, config} from './config';
import md5 from './md5';

export function disableDevtool (opts) {
    mergeConfig(opts);
    if (checkTk()) {return;}
    initInterval();
    disableKeyAndMenu();
    initDevTool();
    initDebugger();
}

disableDevtool.md5 = md5;

export function onDevToolOpen () {
    clearTimeout();
    config.ondevtoolopen();
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

let disableDebug = false; // 当 initDevTool 方式生效时，去除debug断点

function initDebugger () {
    let debug = new Function('debugger');
    registInterval(() => {
        if (disableDebug) {
            return;
        }
        var last = getNowTime();
        debug();
        // interval 时间是 config.interval，设置config.debugDelay是为了给一个执行的时间
        if (getNowTime() - last > config.interval + config.debugDelay) {
            onDevToolOpen();
        }
    });
}

function initDevTool () {
    const isFF = ~navigator.userAgent.indexOf('Firefox');
    let toTest = '';
    if (isFF) {
        toTest = /./;
        toTest.toString = function () {
            disableDebug = true;
            onDevToolOpen();
        };
    } else {
        toTest = new Image();
        toTest.__defineGetter__('id', function () {
            disableDebug = true;
            onDevToolOpen();
        });
    }
    registInterval(() => {
        console.log(toTest);
        console.clear && console.clear();
    });
}

function checkScriptUse () {
    let dom = document.getElementById('disable-devtool');
    if (!dom) {
        return;
    }
    let json = {};
    ['md5', 'url', 'tk-name', 'debug-delay', 'interval', 'disable-menu'].forEach(name => {
        let value = dom.getAttribute(name);
        if (value !== null) {
            if (name === 'debug-delay' || name === 'interval') {
                value = parseInt(value);
            } else if (name === 'disable-menu') {
                value = value === 'false' ? false : true;
            }
            json[formatName(name)] = value;
        }
    });
    disableDevtool(json);
}

checkScriptUse();