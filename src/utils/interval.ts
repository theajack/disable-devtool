/*
 * @Author: tackchen
 * @Date: 2022-09-27 22:16:40
 * @Description: Coding something
 */
import {IDisableDevtool} from '../type';
import {Detector} from '../detector/detector';
import {config} from './config';
import {clearLog} from './log';
import {clearDevToolOpenState, checkOnDevClose} from './open-state';
import {hackAlert, IS, onPageShowHide} from './util';
import {isIgnored} from 'src/plugins/ignore';
import DebugLib from 'src/detector/sub-detector/debug-lib';

let interval: any = 0, timer: any = 0;
const calls: Detector[] = [];
let time = 0;

export function initInterval (dd: IDisableDevtool) {
  let _pause = false;
  const pause = () => {_pause = true;};
  const goon = () => {_pause = false;};
  hackAlert(pause, goon); // 防止 alert等方法触发了debug延迟计算
  onPageShowHide(goon, pause); // 防止切后台触发了debug延迟计算

  interval = window.setInterval(() => {
    if (dd.isSuspend || _pause || isIgnored()) return;
    for (const detector of calls) {
      clearDevToolOpenState(detector.type);
      detector.detect(time++);
    };
    clearLog();
    checkOnDevClose();
  }, config.interval);
  // stopIntervalTime 之后判断 如果不是pc去掉定时器interval，为了优化移动端的性能
  // 如果控制面板被打开了该定时器timer会被清除
  timer = setTimeout(() => {
    if (!IS.pc && !DebugLib.isUsing()) {
      clearDDInterval();
    }
  }, config.stopIntervalTime);
}

export function registInterval (detector: Detector) {
  calls.push(detector);
}

export function clearDDInterval () {
  window.clearInterval(interval);
}

export function clearDDTimeout () {
  window.clearTimeout(timer);
}