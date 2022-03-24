import {config} from './config';
import {isMacOs} from './util';

export function disableKeyAndMenu () {
    // let key1 = 'shiftKey', key2 = 'ctrlKey';
    // 'metaKey'; // mac 的 commond
    // 'altKey'; // mac 的 option
    const KEY = {I: 73, U: 85, S: 83, F12: 123};
    
    const isOpenDevToolKey = isMacOs ?
        ((e, code) => (e.metaKey && e.altKey && code === KEY.I)) :
        ((e, code) => (e.ctrlKey && e.shiftKey && code === KEY.I));
    const isViewSourceCodeKey = isMacOs ?
        ((e, code) => (e.metaKey && e.altKey && code === KEY.U) || (e.metaKey && code === KEY.S)) :
        ((e, code) => (e.ctrlKey && (code === KEY.S || code === KEY.U)));

    window.addEventListener('keydown', (e) => {
        e = e || window.event;
        const keyCode = e.keyCode || e.which;
        if (
            keyCode === KEY.F12 || // 禁用f12
            isOpenDevToolKey(e, keyCode) || // 禁用 ctrl + shift + i
            isViewSourceCodeKey(e, keyCode) // 禁用 ctrl + u 和 ctrl + s 查看和保存源码
        ) {
            e.returnValue = false;
            e.preventDefault();
            return false;
        }
    }, true);

    disableMenu();
    disableSelect();
    disableCopy();
    disableCut();
}

function disableMenu () {
    if (config.disableMenu) {
        preventEvent(window, 'contextmenu');
    }
}
function disableSelect () {
    if (config.disableSelect) {
        preventEvent(window, 'selectstart');
    }
}
function disableCopy () {
    if (config.disableCopy) {
        preventEvent(window, 'copy');
    }
}
function disableCut () {
    if (config.disableCut) {
        preventEvent(window, 'cut');
    }
}
function preventEvent (target, name) {
    target.addEventListener(name, (e) => {
        e = e || window.event;
        e.returnValue = false;
        e.preventDefault();
        return false;
    });
}