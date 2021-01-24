import {disableKeyAndMenu} from './key-menu';
import {initInterval, registInterval, clearTimeout} from './interval';
import {formatName, getUrlParam, isFirefox, isQQBrowser} from './util';
import {mergeConfig, config} from './config';
import md5 from './md5';
import version from './version';

export function disableDevtool (opts) {
    mergeConfig(opts);
    if (checkTk()) {return;}
    initInterval();
    disableKeyAndMenu();
    initDevTool();
}

disableDevtool.md5 = md5;
disableDevtool.version = version;

let hasOpened = false;
export function onDevToolOpen () {
    let time = new Date().getTime();
    console.log('You ar not allow to use DEVTOOL!', time);
    if (!isQQBrowser()) {
        if (hasOpened) {return {time, next () {}};}
        hasOpened = true;
    }
    return {time, next () {
        clearTimeout();
        config.ondevtoolopen();
    }};
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

function initDevTool () {
    const isQQ = isQQBrowser();
    const isFF = isFirefox();
    let toTest = '';
    if (isQQ) {
        let lastTime = 0;
        toTest = /./;
        console.log(toTest);
        toTest.toString = function () {
            let {time, next} = onDevToolOpen();
            if (lastTime && time - lastTime < 100) {
                next();
            } else {
                lastTime = time;
            }
            return '';
        };
    } else if (isFF) {
        toTest = /./;
        console.log(toTest);
        toTest.toString = function () {
            onDevToolOpen().next();
            return '';
        };
    } else {
        toTest = new Image();
        toTest.__defineGetter__('id', function () {
            onDevToolOpen().next();
        });
    }
    registInterval(() => {
        console.log(toTest);
        console.clear();
    });
}

function checkScriptUse () {
    let dom = document.querySelector('[disable-devtool-auto]');
    if (!dom) {
        return;
    }
    let json = {};
    ['md5', 'url', 'tk-name', 'interval', 'disable-menu'].forEach(name => {
        let value = dom.getAttribute(name);
        if (value !== null) {
            if (name === 'interval') {
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