/*
 * @Author: tackchen
 * @Date: 2022-09-27 22:16:40
 * @Description: Coding something
 */
import {IConfig} from '../type';
import {closeWindow} from './close-window';

export const config: IConfig = {
  md5: '',
  ondevtoolopen: closeWindow, // ondevtoolopen 优先级高于 url
  ondevtoolclose: null, // ondevtoolclose 监听
  url: '',
  tkName: 'ddtk',
  interval: 200,
  disableMenu: true, // 是否禁用右键菜单
  stopIntervalTime: 5000, // 在移动端时取消监视的等待时长
  clearIntervalWhenDevOpenTrigger: false, // 是否在触发之后停止监控
  detectors: 'all',
  clearLog: true,
  disableSelect: false,
  disableCopy: false,
  disableCut: false,
  disablePaste: false,
  ignore: null,
};

const MultiTypeKeys = ['detectors', 'ondevtoolclose', 'ignore'];

export function mergeConfig (opts: Partial<IConfig> = {}) {
    
  for (const key in config) {
    const k = key as keyof IConfig;
    if (
      typeof opts[k] !== 'undefined' &&
        (typeof config[k] === typeof opts[k] || MultiTypeKeys.indexOf(k) !== -1)
    ) {
      (config as any)[k] = opts[k];
    }
  }
  checkConfig();
}

function checkConfig () {
  if (
    typeof config.ondevtoolclose === 'function' &&
        config.clearIntervalWhenDevOpenTrigger === true
  ) {
    config.clearIntervalWhenDevOpenTrigger = false;
    console.warn('【DISABLE-DEVTOOL】clearIntervalWhenDevOpenTrigger 在使用 ondevtoolclose 时无效');
  }
}