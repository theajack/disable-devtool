export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
}

export function getNowTime () {
    return new Date().getTime();
}

export function getUrlParam (name) {
    let {search} = window.location;
    const {hash} = window.location;
    // # 在 ? 之前，即 http://localhost/#file?key=value，会导致 search 为空。
    if (search === '' && hash !== '') {
        // 为 search 补上前缀'?'，以便后面的逻辑处理不变。
        search = `?${hash.split('?')[1]}`;
    }
    if (search !== '' && search !== undefined) {
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
