/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:54
 * @LastEditor: theajack
 * @LastEditTime: 2021-11-17 12:02:49
 * @Description: Coding something
 * @FilePath: \disable-devtool\src\detector\size.js
 */

import {isInIframe} from '../util';
import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';

function checkWindowSizeUneven () {
    const widthUneven = window.outerWidth - window.innerWidth > 100;
    const heightUneven = window.outerHeight - window.innerHeight > 300; // 调大一点防止误伤
    if (widthUneven || heightUneven) {
        triggerOnDevOpen(DETECTOR_TYPE.SIZE);
        return false;
    }
    return true;
}

export default function detector () {
    if (isInIframe()) {
        console.warn('SizeDetector is disabled in IFrame');
        return;
    }
    checkWindowSizeUneven();
    window.addEventListener('resize', () => {
        setTimeout(checkWindowSizeUneven, 100);
    }, true);
}