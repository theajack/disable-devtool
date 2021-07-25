import {config} from './config';
import {clearDDInterval} from './interval';

export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
}

export function closeWindow () {
    clearDDInterval();
    if (config.url) {
        window.location.href = config.url;
    } else {
        try {
            window.opener = null;
            window.open('', '_self');
            // 需要是有js跳转到这个页面才可以关闭这个页面
            window.close();
            window.history.back();
        } catch (e) {
            console.log(e);
        }
        setTimeout(() => {
            // 否则执行跳转到 url
            window.location.href = `https://tackchen.gitee.io/404.html?h=${encodeURIComponent(location.host)}`;
        }, 500);
    }
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

export function isIE () {
    const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    return isIE || isEdge || isIE11;
    // if (isIE) {
    //     let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    //     reIE.test(userAgent);
    //     let fIEVersion = parseFloat(RegExp['$1']);
    //     if (fIEVersion == 7) {
    //         return 7;
    //     } else if (fIEVersion == 8) {
    //         return 8;
    //     } else if (fIEVersion == 9) {
    //         return 9;
    //     } else if (fIEVersion == 10) {
    //         return 10;
    //     } else {
    //         return 6;// IE版本<=7
    //     }
    // } else if (isEdge) {
    //     return 'edge';// edge
    // } else if (isIE11) {
    //     return 11; // IE11
    // } else {
    //     return -1;// 不是ie浏览器
    // }
}

export function isQQBrowser () {
    return hasUaName('qqbrowser');
}

export function isFirefox () {
    return hasUaName('firefox');
}

function hasUaName (name) {
    return navigator.userAgent.toLocaleLowerCase().indexOf(name) !== -1;
}