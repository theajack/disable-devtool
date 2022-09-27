

export function now () {
  return new Date().getTime();
}

export function calculateTime (func: Function) {
  const start = now();
  func();
  return now() - start;
}

export function getUrlParam (name: string) {
  let {search} = window.location;
  const {hash} = window.location;
  // # 在 ? 之前，即 http://localhost/#file?key=value，会导致 search 为空。
  if (search === '' && hash !== '') {
    // 为 search 补上前缀'?'，以便后面的逻辑处理不变。
    search = `?${hash.split('?')[1]}`;
  }
  if (search !== '' && search !== undefined) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
  }
  return '';
}

export function formatName (name: string) {
  if (name.indexOf('-') === -1) {
    return name;
  }
  let flag = false;
  return name.split('').map(c => {
    if (c === '-') {
      flag = true;
      return '';
    }
    if (flag) {
      flag = false;
      return c.toUpperCase();
    }
    return c;
  }).join('');
}


export function onPageShowHide (
  onshow: ()=>void,
  onhide: ()=>void,
) {
  const doc = document as any;
  let hidden: string, state: string, visibilityChange;
  if (typeof doc.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
    state = 'visibilityState';
  } else if (typeof doc.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
    state = 'mozVisibilityState';
  } else if (typeof doc.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
    state = 'msVisibilityState';
  } else if (typeof doc.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
    state = 'webkitVisibilityState';
  }
  const cb = function () {
    if (doc[state] === hidden) {
      onhide();
    } else {
      onshow();
    }
  };
  doc.removeEventListener(visibilityChange, cb, false);
  doc.addEventListener(visibilityChange, cb, false);
}

export function hackAlert (before?: ()=>void, after?: ()=>void) {
  const _alert = window.alert;
  const _confirm = window.confirm;
  const _prompt = window.prompt;
  const mod = (fn: Function) => {
    return (...args: any[]) => {
      if (before) {before();}
      const result = fn(...args);
      if (after) {after();}
      return result;
    };
  };
  try {
    window.alert = mod(_alert);
    window.confirm = mod(_confirm);
    window.prompt = mod(_prompt);
  } catch (e) {
    
  }
}

function hasUaName (name: string): boolean {
  return navigator.userAgent.toLocaleLowerCase().indexOf(name) !== -1;
}

export const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();

export const isPC = !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());

export const isQQBrowser = hasUaName('qqbrowser');

export const isFirefox = hasUaName('firefox');

export const isMacOs = hasUaName('macintosh');

export const isEdge = hasUaName('edge');

export const isOldEdge = isEdge && !hasUaName('chrome');

export const isIE = isOldEdge || hasUaName('trident') || hasUaName('msie');

export const isIOSChrome = hasUaName('crios');

export const isIOSEdge = hasUaName('edgios');

export const isChrome = hasUaName('chrome') || isIOSChrome;

function createLargeObject () {
  const largeObject: Record<string, string> = {};
  for (let i = 0; i < 500; i++) {
    largeObject[`${i}`] = `${i}`;
  }
  return largeObject;
}

export function createLargeObjectArray () {
  const largeObject = createLargeObject();
  const largeObjectArray = [];

  for (let i = 0; i < 50; i++) {
    largeObjectArray.push(largeObject);
  }

  return largeObjectArray;
}
