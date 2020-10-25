import {config} from './config';
import {isIE} from './util';

export function disableKeyAndMenu () {
    window.addEventListener('keydown', (e) => {
        e = e || window.event;
        let keyCode = e.keyCode || e.which;
        // alert(e.keyCode);
        if (keyCode === 123 || (e.shiftKey && e.ctrlKey && e.keyCode === 73)) {
            e.returnValue = false;
            e.preventDefault();
            return false;
        }
    }, false);
    if (config.disableMenu || isIE()) { // ie 右键菜单会阻塞线程影响debug延迟计算 禁用右键菜单
        window.addEventListener('contextmenu', (e) => {
            e = e || window.event;
            e.returnValue = false;
            e.preventDefault();
            return false;
        }, false);
    }
}