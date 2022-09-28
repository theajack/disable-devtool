/*
 * @Author: tackchen
 * @Date: 2022-09-27 22:16:40
 * @Description: Coding something
 */
import {closeWindow} from './close-window';
import {DetectorType} from './enum';

export interface IConfig {
    md5: string; // 绕过禁用的md5值，详情见3.2，默认不启用绕过禁用
    url: string; // 关闭页面失败时的跳转页面，默认值为localhost
    tkName: string; // 绕过禁用时的url参数名称，默认为 ddtk
    ondevtoolopen(type: DetectorType, next: Function): void; // 开发者面板打开的回调，启用时url参数无效
    ondevtoolclose: Function | null;
    interval: number; // 定时器的时间间隔 默认200ms
    disableMenu: boolean; // 是否禁用右键菜单 默认为true
    stopIntervalTime: number; // 在移动端时取消监视的等待时长
    clearIntervalWhenDevOpenTrigger: boolean; // 是否在触发之后停止监控
    detectors: DetectorType[] | 'all';  // 启用的监测器 默认为全部
    clearLog: boolean; // 是否每次都清除log
    disableSelect: boolean; // 是否禁用选择文本 默认为false
    disableCopy: boolean; // 是否禁用复制 默认为false
    disableCut: boolean; // 是否禁用剪切 默认为false
    disablePaste: boolean; // 是否禁用粘贴 默认为false
}

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
};

const MultiTypeKeys = ['detectors', 'ondevtoolclose'];

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