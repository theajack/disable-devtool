/*
 * @Author: theajack
 * @Date: 2021-07-24 23:16:34
 * @LastEditor: theajack
 * @LastEditTime: 2022-09-28 21:15:17
 * @Description: Coding something
 */

import {config} from '../utils/config';
import RegToStringDetector from './sub-detector/reg-to-string';
import DefineIdDetector from './sub-detector/define-id';
import SizeDetector from './sub-detector/size';
import DateToStringDetector from './sub-detector/date-to-string';
import FuncToStringDetector from './sub-detector/func-to-string';
import DebuggerDetector from './sub-detector/debugger';
import PerformanceDetector from './sub-detector/performance';
import DebugLibDetector from './sub-detector/debug-lib';

import {DetectorType} from '../utils/enum';

const Detectors = {
  [DetectorType.RegToString]: RegToStringDetector,
  [DetectorType.DefineId]: DefineIdDetector,
  [DetectorType.Size]: SizeDetector,
  [DetectorType.DateToString]: DateToStringDetector,
  [DetectorType.FuncToString]: FuncToStringDetector,
  [DetectorType.Debugger]: DebuggerDetector,
  [DetectorType.Performance]: PerformanceDetector,
  [DetectorType.DebugLib]: DebugLibDetector,
};

export function initDetectors () {
  const typeArray = config.detectors === 'all' ?
    Object.keys(Detectors) : config.detectors;
    
  typeArray.forEach(type => {
    const DetectorClass = Detectors[type as Exclude<DetectorType, DetectorType.Unknown>];
    new DetectorClass();
  });
}
