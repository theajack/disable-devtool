/*
 * @Author: tackchen
 * @Date: 2022-09-27 22:49:01
 * @Description: Coding something
 */
import './utils/log';
import {disableKeyAndMenu} from './utils/key-menu';
import {initInterval} from './utils/interval';
import {formatName, getUrlParam} from './utils/util';
import {mergeConfig, config} from './utils/config';
import md5 from './utils/md5';
import version from './version';
import {initDetectors} from './detector/index';
import {DetectorType} from './utils/enum';
import {isDevToolOpened} from './utils/open-state';
import {IConfig, IDisableDevtool} from './type';

export const disableDevtool: IDisableDevtool = Object.assign(((opts?: Partial<IConfig>) => {
  mergeConfig(opts);
  if (checkTk()) {return;}
  disableDevtool.isRunning = true;
  initInterval(disableDevtool);
  disableKeyAndMenu(disableDevtool);
  initDetectors();
}), {
  isRunning: false,
  isSuspend: false,
  md5,
  version,
  DetectorType,
  isDevToolOpened,
});

function checkTk () {
  if (config.md5) { // 启用了 md5
    const tk = getUrlParam(config.tkName);
    if (md5(tk) === config.md5) { // 命中tk
      return true;
    }
  }
  return false;
}

function checkScriptUse () {
  if (typeof document === 'undefined') {
    return;
  }
  const dom = document.querySelector('[disable-devtool-auto]');
  if (!dom) {
    return;
  }

  const boolAttrs = [
    'disable-menu', 'disable-select', 'disable-copy',
    'disable-cut', 'disable-paste', 'clear-log'
  ];

  const intAttrs = ['interval'];

  const json: Record<string, any> = {};
  [
    'md5', 'url', 'tk-name', 'detectors',
    ...boolAttrs, ...intAttrs
  ].forEach(name => {
    let value: any = dom.getAttribute(name);
    if (value !== null) {
      if (intAttrs.indexOf(name) !== -1) {
        value = parseInt(value);
      } else if (boolAttrs.indexOf(name) !== -1) {
        value = value === 'false' ? false : true;
      } else if (name === 'detector') {
        if (value !== 'all') {
          value = value.split(' ');
        }
      }
      json[formatName(name)] = value;
    }
  });
  disableDevtool(json as Partial<IConfig>);
}

checkScriptUse();