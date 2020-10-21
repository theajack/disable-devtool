export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
}

export function closeWindow (url = 'https://localhost') {
    window.opener = null;
    window.open('', '_self');
    window.close();
    window.location.href = url;
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