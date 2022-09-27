/*
 * @Author: tackchen
 * @Date: 2022-02-09 20:55:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 20:46:01
 * @FilePath: /disable-devtool/src/detector/enable.js
 * @Description: 统一处理各种探测器是否开启
 */

import {isChrome, isEdge, isFirefox, isInIframe, isIOSChrome, isIOSEdge, isQQBrowser} from '../utils/util';
import {DETECTOR_TYPE} from '../utils/constant';

const EnableMap = {
    [DETECTOR_TYPE.REG_TO_STRING]: (isQQBrowser || isFirefox),
    [DETECTOR_TYPE.DEFINE_ID]: true,
    [DETECTOR_TYPE.SIZE]: (!isInIframe && !isEdge),

    // ! 判断是否是 ios chrome或edge true时 禁用 date 和 func detector，因为会误伤。启用debugger detector兜底
    [DETECTOR_TYPE.DATE_TO_STRING]: (!isIOSChrome && !isIOSEdge),
    [DETECTOR_TYPE.FUNC_TO_STRING]: (!isIOSChrome && !isIOSEdge),
    [DETECTOR_TYPE.DEBUGGER]: (isIOSChrome || isIOSEdge),
    [DETECTOR_TYPE.PERFORMANCE]: (isChrome),
};

export function processDetectorEnableStatus (name, detector) {
    if (typeof detector !== 'function') return;

    const value = EnableMap[name];

    if (typeof value === 'undefined') {
        value = true;
    } else if (typeof value === 'function') {
        value = value();
    }
    if (value === true) {
        detector();
    }
}