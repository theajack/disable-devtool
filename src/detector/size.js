/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:54
 * @LastEditor: theajack
 * @LastEditTime: 2021-07-25 17:12:51
 * @Description: Coding something
 * @FilePath: \disable-devtool\src\detector\size.js
 */

import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';

function checkWindowSizeUneven () {
    const threshold = 160;
    const widthUneven = window.outerWidth - window.innerWidth > threshold;
    const heightUneven = window.outerHeight - window.innerHeight > threshold;
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