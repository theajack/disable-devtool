/*
 * @Author: tackchen
 * @Date: 2022-09-27 22:16:40
 * @Description: Coding something
 */
import {IDisableDevtool} from '../type';
import {isIgnored} from '../plugins/ignore';
import {config} from './config';
import {IS} from './util';

let isSuspend = () => false;

export function disableKeyAndMenu (dd: IDisableDevtool) {
  isSuspend = () => dd.isSuspend;
  
  const top = window.top;
  let parent = window.parent;
  disableTarget(window);
  if (!config.disableIframeParents || !top || !parent || top === window) return;
  while (parent !== top) {
    disableTarget(parent);
    parent = parent.parent;
  }
  disableTarget(top);
}

function disableTarget (target: Window) {
  // let key1 = 'shiftKey', key2 = 'ctrlKey';
  // 'metaKey'; // mac 的 commond
  // 'altKey'; // mac 的 option
  const KEY = {J: 74, I: 73, U: 85, S: 83, F12: 123};
     
  // 禁用 ctrl + shift + i/j
  const isOpenDevToolKey = IS.macos ?
    ((e: KeyboardEvent, code: number) => (e.metaKey && e.altKey && (code === KEY.I || code === KEY.J))) :
    ((e: KeyboardEvent, code: number) => (e.ctrlKey && e.shiftKey && (code === KEY.I || code === KEY.J)));
  
  const isViewSourceCodeKey = IS.macos ?
    ((e: KeyboardEvent, code: number) => (e.metaKey && e.altKey && code === KEY.U) || (e.metaKey && code === KEY.S)) :
    ((e: KeyboardEvent, code: number) => (e.ctrlKey && (code === KEY.S || code === KEY.U)));

  target.addEventListener('keydown', (e) => {
    e = e || target.event;
    const keyCode = e.keyCode || e.which;
    if (
      keyCode === KEY.F12 || // 禁用f12
      isOpenDevToolKey(e, keyCode) || // 禁用 ctrl + shift + i
      isViewSourceCodeKey(e, keyCode) // 禁用 ctrl + u 和 ctrl + s 查看和保存源码
    ) {
      return preventEvent(target, e);
    }
  }, true);

  disableMenu(target);
  disableSelect(target);
  disableCopy(target);
  disableCut(target);
  disablePaste(target);
}

function disableMenu (target: Window) {
  if (config.disableMenu) {
    target.addEventListener('contextmenu', (e: Event & {pointerType: string}) => {
      if (e.pointerType === 'touch') return;
      return preventEvent(target, e);
    });
  }
}
function disableSelect (target: Window) {
  if (config.disableSelect) {
    addPreventListener(target, 'selectstart');
  }
}
function disableCopy (target: Window) {
  if (config.disableCopy) {
    addPreventListener(target, 'copy');
  }
}
function disableCut (target: Window) {
  if (config.disableCut) {
    addPreventListener(target, 'cut');
  }
}
function disablePaste (target: Window) {
  if (config.disablePaste) {
    addPreventListener(target, 'paste');
  }
}
function addPreventListener (target: Window, name: string) {
  target.addEventListener(name, (e: Event) => {
    return preventEvent(target, e);
  });
}

function preventEvent (target: Window, e: Event) {
  if (isIgnored() || isSuspend()) return;
  e = e || target.event;
  e.returnValue = false;
  e.preventDefault();
  return false;
}