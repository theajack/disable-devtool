import {closeWindow} from './util';

export let config = {
    md5: '',
    ondevtoolopen: closeWindow,
    homeUrl: 'http://localhost',
    tkName: 'ddtk',
};

export function mergeConfig (opts = {}) {
    for (let k in config) {
        if (opts[k] && typeof config[k] === typeof opts[k]) {
            config[k] = opts[k];
        }
    }
}