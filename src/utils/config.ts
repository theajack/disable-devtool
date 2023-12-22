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
  timeOutUrl: '',
  tkName: 'ddtk',
  interval: 500,
  disableMenu: true, // 是否禁用右键菜单
  stopIntervalTime: 5000, // 在移动端时取消监视的等待时长
  clearIntervalWhenDevOpenTrigger: false, // 是否在触发之后停止监控
  detectors: [0, 1, 3, 4, 5, 6, 7], // 'all', ! 默认去掉sizeDetector 因为会误伤
  clearLog: true,
  disableSelect: false,
  disableCopy: false,
  disableCut: false,
  disablePaste: false,
  ignore: null,
  disableIframeParents: true,
  seo: true,
  rewriteHTML: '',
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