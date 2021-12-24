import './utils/log';
import {disableKeyAndMenu} from './utils/key-menu';
import {initInterval} from './utils/interval';
import {formatName, getUrlParam} from './utils/util';
import {mergeConfig, config} from './utils/config';
import md5 from './utils/md5';
import version from './version';
import {DETECTOR_TYPE, initDetectors} from './detector/detector';

export function disableDevtool (opts) {
    mergeConfig(opts);
    if (checkTk()) {return;}
    initInterval();
    disableKeyAndMenu();
    initDetectors();
}

disableDevtool.md5 = md5;
disableDevtool.version = version;
disableDevtool.DETECTOR_TYPE = DETECTOR_TYPE;

function checkTk () {
    if (config.md5) { // 启用了 md5
        const tk = getUrlParam(config.tkName);
        if (md5(tk) === config.md5) { // 命中tk
            return true;
        }
    }
    return false;
}

function checkScriptUse () {
    if (typeof document === 'undefined') {
        return;
    }
    const dom = document.querySelector('[disable-devtool-auto]');
    if (!dom) {
        return;
    }
    const json = {};
    ['md5', 'url', 'tk-name', 'interval', 'disable-menu', 'detectors'].forEach(name => {
        let value = dom.getAttribute(name);
        if (value !== null) {
            if (name === 'interval') {
                value = parseInt(value);
            } else if (name === 'disable-menu') {
                value = value === 'false' ? false : true;
            } else if (name === 'detector') {
                if (value !== 'all') {
                    value = value.split(' ');
                }
            }
            json[formatName(name)] = value;
        }
    });
    disableDevtool(json);
}

checkScriptUse();