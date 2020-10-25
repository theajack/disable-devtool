import {closeWindow} from './util';

export let config = {
    md5: '',
    ondevtoolopen: closeWindow, // ondevtoolopen 优先级高于 url
    url: '',
    tkName: 'ddtk',
    debugDelay: 200,
    interval: 200,
    disableMenu: true, // 该参数ie下无效，ie 右键菜单会阻塞线程影响debug延迟计算 禁用右键菜单
    stopIntervalTime: 5000, // 在移动端时取消监视的等待时长
};

export function mergeConfig (opts = {}) {
    for (let k in config) {
        if (opts[k] && typeof config[k] === typeof opts[k]) {
            config[k] = opts[k];
        }
    }
}