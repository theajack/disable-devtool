import {closeWindow} from './close-window';

export const config = {
    md5: '',
    ondevtoolopen: closeWindow, // ondevtoolopen 优先级高于 url
    url: '',
    tkName: 'ddtk',
    interval: 200,
    disableMenu: true, // 是否禁用右键菜单
    stopIntervalTime: 5000, // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger: false, // 是否在触发之后停止监控
    detectors: 'all',
};

const MultiTypeKeys = ['detectors'];

export function mergeConfig (opts = {}) {
    for (const k in config) {
        if (
            typeof opts[k] !== 'undefined' &&
            (typeof config[k] === typeof opts[k] || MultiTypeKeys.includes(k))
        ) {
            config[k] = opts[k];
        }
    }
}