import {config} from './config';

export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
}

export function closeWindow () {
    // 需要是有js跳转到这个页面才可以关闭这个页面
    window.opener = null;
    window.open('', '_self');
    window.close();
    // 否则执行跳转到 url
    window.location.href = config.url;
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