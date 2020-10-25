import {config} from './config';

export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
}

export function closeWindow () {
    // 需要是有js跳转到这个页面才可以关闭这个页面
    if (config.url) {
        window.location.href = config.url;
    } else {
        window.opener = null;
        window.open('', '_self');
        window.close();
        window.history.back();
        setTimeout(() => {
            window.location.href = 'http://localhost';
        }, 100);
    }
    // 否则执行跳转到 url
}

export function getNowTime () {
    return new Date().getTime();
}

export function getUrlParam (name) {
    let search = window.location.search;
    if (search !== '') {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = search.substr(1).match(reg);
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
    var flag = false;
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
    var hidden, state, visibilityChange;
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
    var cb = function () {
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
    let _alert = window.alert;
    let _confirm = window.confirm;
    let _prompt = window.prompt;
    let mod = (fn) => {
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
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    return isIE || isEdge || isIE11;
    // if (isIE) {
    //     var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    //     reIE.test(userAgent);
    //     var fIEVersion = parseFloat(RegExp['$1']);
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