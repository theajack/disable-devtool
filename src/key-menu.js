import {config} from './config';

export function disableKeyAndMenu () {
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 123 || (e.shiftKey && e.ctrlKey && e.keyCode === 73)) {
            e.returnValue = false;
            return false;
        }
    });
    if (config.disableMenu) {
        window.addEventListener('contextmenu', (e) => {
            e.returnValue = false;
            return false;
        });
    }
}