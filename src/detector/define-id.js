/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:49
 * @LastEditor: theajack
 * @LastEditTime: 2021-12-24 13:23:55
 * @Description: Coding something
 */
import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
import {registInterval} from '../utils/interval';
import {log} from '../utils/log';

export default function detector () {
    const div = document.createElement('div');
    div.__defineGetter__('id', function () {
        triggerOnDevOpen(DETECTOR_TYPE.DEFINE_ID);
    });
    Object.defineProperty(div, 'id', {
        get: function () {
            triggerOnDevOpen(DETECTOR_TYPE.DEFINE_ID);
        },
    });
    registInterval(() => {
        log(div);
    });
}