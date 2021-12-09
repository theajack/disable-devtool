/*
 * @Author: theajack
 * @Date: 2021-07-24 23:15:22
 * @LastEditor: theajack
 * @LastEditTime: 2021-12-09 08:00:47
 * @Description: Coding something
 */

// import {DETECTOR_TYPE, triggerOnDevOpen} from './detector';
// import {registInterval} from '../interval';
// import {log} from '../util';

// function logTime () {
//     const d = new Date();
//     for (let i = 0; i < 2000; i++) {
//         log(1);
//     }
//     console.clear();
//     if (new Date() - d > 100) {
//         console.warn(new Date() - d);
//         triggerOnDevOpen(DETECTOR_TYPE.LOG_TIME);
//     }
// }

// export default function detector () {
//     registInterval((time) => {
//         if (time % 5 === 0) {
//             logTime();
//         }
//     });
// }

/**
 * 2000
 * windows
 * edge 106 15
 * qq 238 11
 * chrome 166 39
 * ie 211 1
 * 360 134 23
 * firefox 255 54
 *
 */