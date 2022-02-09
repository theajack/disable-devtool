/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:54
 * @LastEditor: theajack
 * @LastEditTime: 2022-02-09 21:23:26
 * @Description: Coding something
 * @FilePath: /disable-devtool/src/detector/size.js
 */

import {DETECTOR_TYPE} from '../utils/constant';
import {clearDevToolOpenState} from '../utils/open-state';
import {triggerOnDevOpen} from './detector';

function checkWindowSizeUneven () {
    const screenRatio = countScreenZoomRatio();
    if (screenRatio === false) { // 如果获取不到屏幕缩放尺寸 则不启用sizeDetector
        return true;
    }
    const type = DETECTOR_TYPE.SIZE;
    const widthUneven = window.outerWidth - window.innerWidth * screenRatio > 200; // 调大一点防止误伤
    const heightUneven = window.outerHeight - window.innerHeight * screenRatio > 300; // 调大一点防止误伤
    if (widthUneven || heightUneven) {
        triggerOnDevOpen(type);
        return false;
    }
    clearDevToolOpenState(type);
    return true;
}

function countScreenZoomRatio () {
    if (checkExist(window.devicePixelRatio)) {
        return window.devicePixelRatio;
    }
    const screen = window.screen;
    if (checkExist(screen)) {
        return false;
    }
    if (screen.deviceXDPI && screen.logicalXDPI) {
        return screen.deviceXDPI / screen.logicalXDPI;
    }
    return false;
};

export default function detector () {
    checkWindowSizeUneven();
    window.addEventListener('resize', () => {
        setTimeout(checkWindowSizeUneven, 100);
    }, true);
}

function checkExist (v) {
    return typeof v !== 'undefined' && v !== null;
}