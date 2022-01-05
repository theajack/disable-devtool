import {log} from './log';

export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
}

export function getNowTime () {
    return new Date().getTime();
}

export function getUrlParam (name) {
    const search = window.location.search;
    if (search !== '') {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
    }
    return '';
}

export function formatName (name) {
    if (name.indexOf('-') === -1) {
        return name;
    }
    let flag = false;
    return name.split('').map(c => {
        if (c === '-') {
            flag = true;
            return '';
        }
        if (flag) {
            flag = false;
            return c.toUpperCase();
        }
        return c;
    }).join('');
}


export function onPageShowHide (onshow, onhide) {
    let hidden, state, visibilityChange;
    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
        state = 'visibilityState';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
        state = 'mozVisibilityState';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
        state = 'msVisibilityState';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
        state = 'webkitVisibilityState';
    }
    const cb = function () {
        if (document[state] === hidden) {
            onhide();
        } else {
            onshow();
        }
    };
    document.removeEventListener(visibilityChange, cb, false);
    document.addEventListener(visibilityChange, cb, false);
}

export function hackAlert (before, after) {
    const _alert = window.alert;
    const _confirm = window.confirm;
    const _prompt = window.prompt;
    const mod = (fn) => {
        return (...args) => {
            if (before) {before();}
            fn(...args);
            if (after) {after();}
        };
    };
    window.alert = mod(_alert);
    window.confirm = mod(_confirm);
    window.prompt = mod(_prompt);
}

function hasUaName (name) {
    return navigator.userAgent.toLocaleLowerCase().indexOf(name) !== -1;
}

export const isInIframe = (() => {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
})();

export const isQQBrowser = hasUaName('qqbrowser');

export const isFirefox = hasUaName('firefox');

export const isMacOs = hasUaName('macintosh');

export const isOldEdge = hasUaName('edge') && !hasUaName('chrome');

export const isIE = isOldEdge || hasUaName('trident') || hasUaName('msie');

export const isIOSChrome = hasUaName('crios');

// ios chrome log regExp count=3 ， 以此区别真机和开发者工具模拟的
export async function isLogRegExpCount3 () {
    let count = 0;
    const target = new RegExp();
    target.toString = () => {
        count ++;
        return '';
    };
    log(target);
    await delay(100);
    return count === 3;
}

export function delay (time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}