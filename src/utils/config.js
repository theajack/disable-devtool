import {closeWindow} from './close-window';

export const config = {
    md5: '',
    ondevtoolopen: closeWindow, // ondevtoolopen 优先级高于 url
    ondevtoolclose: null, // ondevtoolclose 监听
    url: '',
    tkName: 'ddtk',
    interval: 200,
    disableMenu: true, // 是否禁用右键菜单
    stopIntervalTime: 5000, // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger: false, // 是否在触发之后停止监控
    detectors: 'all',
};

const MultiTypeKeys = ['detectors', 'ondevtoolclose'];

export function mergeConfig (opts = {}) {
    for (const k in config) {
        if (
            typeof opts[k] !== 'undefined' &&
            (typeof config[k] === typeof opts[k] || MultiTypeKeys.indexOf(k) !== -1)
        ) {
            config[k] = opts[k];
        }
    }
    checkConfig();
}

function checkConfig () {
    if (
        typeof config.ondevtoolclose === 'function' &&
        config.clearIntervalWhenDevOpenTrigger === true
    ) {
        config.clearIntervalWhenDevOpenTrigger = false;
        console.warn('【DISABLE-DEVTOOL】clearIntervalWhenDevOpenTrigger 在使用 ondevtoolclose 时无效');
    }
}