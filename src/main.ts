/*
 * @Author: tackchen
 * @Date: 2022-09-27 22:49:01
 * @Description: Coding something
 */
import './utils/log';
import {disableKeyAndMenu} from './utils/key-menu';
import {initInterval} from './utils/interval';
import {getUrlParam, initIS, IS} from './utils/util';
import {mergeConfig, config} from './utils/config';
import md5 from './utils/md5';
import version from './version';
import {initDetectors} from './detector/index';
import {DetectorType} from './utils/enum';
import {isDevToolOpened} from './utils/open-state';
import {IConfig, IDisableDevtool} from './type';
import {initLogs} from './utils/log';
import {checkScriptUse} from './plugins/script-use';

export const disableDevtool: IDisableDevtool = Object.assign(((opts?: Partial<IConfig>) => {
  const r = (reason = '') => ({success: !reason, reason});
  if (disableDevtool.isRunning) return r('already running');
  initIS(); // ! 首先初始化env
  initLogs(); // 然后初始化log
  mergeConfig(opts);
  // 被 token 绕过 或者
  if (checkTk()) return r('token passed');
  // 开启了保护seo 并且 是seobot
  if ((config.seo && IS.seoBot)) return r('seobot');
  disableDevtool.isRunning = true;
  initInterval(disableDevtool);
  disableKeyAndMenu(disableDevtool);
  initDetectors();
  return r();
}), {
  isRunning: false,
  isSuspend: false,
  md5,
  version,
  DetectorType,
  isDevToolOpened,
});

function checkTk () {
  if (!config.md5) return false;
  // 启用了 md5
  const tk = getUrlParam(config.tkName);
  return md5(tk) === config.md5; // 命中tk
}

const options = checkScriptUse();
if (options) {
  disableDevtool(options);
}