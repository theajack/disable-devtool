/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:54
 * @LastEditor: theajack
 * @LastEditTime: 2021-11-15 23:44:27
 * @Description: Coding something
 * @FilePath: /disable-devtool/src/detector/size.js
 */

import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';

function checkWindowSizeUneven () {
    const widthUneven = window.outerWidth - window.innerWidth > 20;
    const heightUneven = window.outerHeight - window.innerHeight > 250; // 调大一点防止误伤
    if (widthUneven || heightUneven) {
        triggerOnDevOpen(DETECTOR_TYPE.SIZE);
        return false;
    }
    return true;
}

export default function detector () {
    checkWindowSizeUneven();
    window.addEventListener('resize', () => {
        setTimeout(checkWindowSizeUneven, 100);
    }, true);
}