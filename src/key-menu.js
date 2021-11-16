import {config} from './config';
import {isMacOs} from './util';

export function disableKeyAndMenu () {
    let key1 = 'shiftKey', key2 = 'ctrlKey';
    if (isMacOs()) {
        key1 = 'metaKey';
        key2 = 'altKey';
    }
    window.addEventListener('keydown', (e) => {
        e = e || window.event;
        const keyCode = e.keyCode || e.which;
        if (keyCode === 123 || (e[key1] && e[key2] && e.keyCode === 73)) {
            e.returnValue = false;
            e.preventDefault();
            return false;
        }
    }, true);
    if (config.disableMenu) {
        window.addEventListener('contextmenu', (e) => {
            e = e || window.event;
            e.returnValue = false;
            e.preventDefault();
            return false;
        }, true);
    }
}