import {config} from './config';

export function disableKeyAndMenu () {
    window.addEventListener('keydown', (e) => {
        e = e || window.event;
        const keyCode = e.keyCode || e.which;
        // alert(e.keyCode);
        if (keyCode === 123 || (e.shiftKey && e.ctrlKey && e.keyCode === 73)) {
            e.returnValue = false;
            e.preventDefault();
            return false;
        }
    }, false);
    if (config.disableMenu) {
        window.addEventListener('contextmenu', (e) => {
            e = e || window.event;
            e.returnValue = false;
            e.preventDefault();
            return false;
        }, false);
    }
}