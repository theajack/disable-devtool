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
    if (config.disableMenu) {
        window.addEventListener('contextmenu', (e) => {
            e = e || window.event;
            e.returnValue = false;
            e.preventDefault();
            return false;
        }, true);
    }
}