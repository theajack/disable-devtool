import {closeWindow} from './util';

export let config = {
    md5: '',
    ondevtoolopen: closeWindow, // ondevtoolopen 优先级高于 url
    url: 'http://localhost',
    tkName: 'ddtk',
    debugDelay: 200,
    interval: 200,
    disableMenu: true
};

export function mergeConfig (opts = {}) {
    for (let k in config) {
        if (opts[k] && typeof config[k] === typeof opts[k]) {
            config[k] = opts[k];
        }
    }
}