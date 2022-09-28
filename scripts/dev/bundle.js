// src/utils/open-state.ts
var isLastStateOpenedBool = false;
var OpenState = {};
function markDevToolOpenState(type) {
  OpenState[type] = true;
}
function clearDevToolOpenState(type) {
  OpenState[type] = false;
}
function isDevToolOpened() {
  for (const key in OpenState) {
    if (OpenState[key]) {
      isLastStateOpenedBool = true;
      return true;
    }
  }
  isLastStateOpenedBool = false;
  return false;
}
function checkOnDevClose() {
  if (typeof config.ondevtoolclose === "function") {
    const isLastOpen = isLastStateOpenedBool;
    if (!isDevToolOpened() && isLastOpen) {
      config.ondevtoolclose();
    }
  }
}

// src/utils/util.ts
function now() {
  return new Date().getTime();
}
function calculateTime(func) {
  const start = now();
  func();
  return now() - start;
}
function getUrlParam(name) {
  let { search } = window.location;
  const { hash } = window.location;
  if (search === "" && hash !== "") {
    search = `?${hash.split("?")[1]}`;
  }
  if (search !== "" && search !== void 0) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
  }
  return "";
}
function formatName(name) {
  if (name.indexOf("-") === -1) {
    return name;
  }
  let flag = false;
  return name.split("").map((c) => {
    if (c === "-") {
      flag = true;
      return "";
    }
    if (flag) {
      flag = false;
      return c.toUpperCase();
    }
    return c;
  }).join("");
}
function onPageShowHide(onshow, onhide) {
  const doc = document;
  let hidden, state, visibilityChange;
  if (typeof doc.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    state = "visibilityState";
  } else if (typeof doc.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    state = "mozVisibilityState";
  } else if (typeof doc.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    state = "msVisibilityState";
  } else if (typeof doc.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    state = "webkitVisibilityState";
  }
  const cb = function() {
    if (doc[state] === hidden) {
      onhide();
    } else {
      onshow();
    }
  };
  doc.removeEventListener(visibilityChange, cb, false);
  doc.addEventListener(visibilityChange, cb, false);
}
function hackAlert(before, after) {
  const _alert = window.alert;
  const _confirm = window.confirm;
  const _prompt = window.prompt;
  const mod = (fn) => {
    return (...args) => {
      if (before) {
        before();
      }
      const result = fn(...args);
      if (after) {
        after();
      }
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
function hasUaName(name) {
  return navigator.userAgent.toLocaleLowerCase().indexOf(name) !== -1;
}
var isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();
var isPC = !/(iphone|ipad|ipod|ios|android)/i.test(navigator.userAgent.toLowerCase());
var isQQBrowser = hasUaName("qqbrowser");
var isFirefox = hasUaName("firefox");
var isMacOs = hasUaName("macintosh");
var isEdge = hasUaName("edge");
var isOldEdge = isEdge && !hasUaName("chrome");
var isIE = isOldEdge || hasUaName("trident") || hasUaName("msie");
var isIOSChrome = hasUaName("crios");
var isIOSEdge = hasUaName("edgios");
var isChrome = hasUaName("chrome") || isIOSChrome;
function createLargeObject() {
  const largeObject = {};
  for (let i = 0; i < 500; i++) {
    largeObject[`${i}`] = `${i}`;
  }
  return largeObject;
}
function createLargeObjectArray() {
  const largeObject = createLargeObject();
  const largeObjectArray = [];
  for (let i = 0; i < 50; i++) {
    largeObjectArray.push(largeObject);
  }
  return largeObjectArray;
}

// src/utils/interval.ts
var interval = 0;
var timer = 0;
var calls = [];
var time = 0;
function initInterval() {
  let _pause = false;
  const pause = () => {
    _pause = true;
  };
  const goon = () => {
    _pause = false;
  };
  hackAlert(pause, goon);
  onPageShowHide(goon, pause);
  interval = window.setInterval(() => {
    if (_pause)
      return;
    calls.forEach((detector) => {
      clearDevToolOpenState(detector.type);
      detector.detect(time++);
    });
    clearLog();
    checkOnDevClose();
  }, config.interval);
  timer = setTimeout(() => {
    if (!isPC) {
      clearDDInterval();
    }
  }, config.stopIntervalTime);
}
function registInterval(detector) {
  calls.push(detector);
}
function clearDDInterval() {
  window.clearInterval(interval);
}
function clearDDTimeout() {
  window.clearTimeout(timer);
}

// src/utils/close-window.ts
function closeWindow() {
  clearDDInterval();
  if (config.url) {
    window.location.href = config.url;
  } else {
    try {
      window.opener = null;
      window.open("", "_self");
      window.close();
      window.history.back();
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      window.location.href = `https://tackchen.gitee.io/404.html?h=${encodeURIComponent(location.host)}`;
    }, 500);
  }
}

// src/utils/config.ts
var config = {
  md5: "",
  ondevtoolopen: closeWindow,
  ondevtoolclose: null,
  url: "",
  tkName: "ddtk",
  interval: 200,
  disableMenu: true,
  stopIntervalTime: 5e3,
  clearIntervalWhenDevOpenTrigger: false,
  detectors: "all",
  clearLog: true,
  disableSelect: false,
  disableCopy: false,
  disableCut: false,
  disablePaste: false
};
var MultiTypeKeys = ["detectors", "ondevtoolclose"];
function mergeConfig(opts = {}) {
  for (const key in config) {
    const k = key;
    if (typeof opts[k] !== "undefined" && (typeof config[k] === typeof opts[k] || MultiTypeKeys.indexOf(k) !== -1)) {
      config[k] = opts[k];
    }
  }
  checkConfig();
}
function checkConfig() {
  if (typeof config.ondevtoolclose === "function" && config.clearIntervalWhenDevOpenTrigger === true) {
    config.clearIntervalWhenDevOpenTrigger = false;
    console.warn("\u3010DISABLE-DEVTOOL\u3011clearIntervalWhenDevOpenTrigger \u5728\u4F7F\u7528 ondevtoolclose \u65F6\u65E0\u6548");
  }
}

// src/utils/log.ts
var console2 = window.console || {
  log: function() {
    return;
  },
  table: function() {
    return;
  },
  clear: function() {
    return;
  }
};
var log = (() => {
  return isIE ? (...args) => {
    return console2.log(...args);
  } : console2.log;
})();
var table = (() => {
  return isIE ? (...args) => {
    return console2.table(...args);
  } : console2.table;
})();
var clearLogFunc = (() => {
  return isIE ? () => {
    return console2.clear();
  } : console2.clear;
})();
function clearLog() {
  if (config.clearLog)
    clearLogFunc();
}

// src/utils/key-menu.ts
function disableKeyAndMenu() {
  const KEY = { J: 74, I: 73, U: 85, S: 83, F12: 123 };
  const isOpenDevToolKey = isMacOs ? (e, code) => e.metaKey && e.altKey && (code === KEY.I || code === KEY.J) : (e, code) => e.ctrlKey && e.shiftKey && (code === KEY.I || code === KEY.J);
  const isViewSourceCodeKey = isMacOs ? (e, code) => e.metaKey && e.altKey && code === KEY.U || e.metaKey && code === KEY.S : (e, code) => e.ctrlKey && (code === KEY.S || code === KEY.U);
  window.addEventListener("keydown", (e) => {
    e = e || window.event;
    const keyCode = e.keyCode || e.which;
    if (keyCode === KEY.F12 || isOpenDevToolKey(e, keyCode) || isViewSourceCodeKey(e, keyCode)) {
      e.returnValue = false;
      e.preventDefault();
      return false;
    }
  }, true);
  disableMenu();
  disableSelect();
  disableCopy();
  disableCut();
  disablePaste();
}
function disableMenu() {
  if (config.disableMenu) {
    preventEvent(window, "contextmenu");
  }
}
function disableSelect() {
  if (config.disableSelect) {
    preventEvent(window, "selectstart");
  }
}
function disableCopy() {
  if (config.disableCopy) {
    preventEvent(window, "copy");
  }
}
function disableCut() {
  if (config.disableCut) {
    preventEvent(window, "cut");
  }
}
function disablePaste() {
  if (config.disablePaste) {
    preventEvent(window, "paste");
  }
}
function preventEvent(target, name) {
  target.addEventListener(name, (e) => {
    e = e || window.event;
    e.returnValue = false;
    e.preventDefault();
    return false;
  });
}

// src/utils/md5.ts
var hexcase = 0;
var chrsz = 8;
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
function core_md5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}
function safe_add(x, y) {
  const lsw = (x & 65535) + (y & 65535);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function str2binl(str) {
  const bin = Array();
  const mask = (1 << chrsz) - 1;
  for (let i = 0; i < str.length * chrsz; i += chrsz)
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
  return bin;
}
function binl2hex(binarray) {
  const hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  let str = "";
  for (let i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 15);
  }
  return str;
}
var md5_default = hex_md5;

// src/version.js
var version_default = "0.2.5";

// src/utils/enum.ts
var DetectorType = /* @__PURE__ */ ((DetectorType2) => {
  DetectorType2[DetectorType2["Unknown"] = -1] = "Unknown";
  DetectorType2[DetectorType2["RegToString"] = 0] = "RegToString";
  DetectorType2[DetectorType2["DefineId"] = 1] = "DefineId";
  DetectorType2[DetectorType2["Size"] = 2] = "Size";
  DetectorType2[DetectorType2["DateToString"] = 3] = "DateToString";
  DetectorType2[DetectorType2["FuncToString"] = 4] = "FuncToString";
  DetectorType2[DetectorType2["Debugger"] = 5] = "Debugger";
  DetectorType2[DetectorType2["Performance"] = 6] = "Performance";
  return DetectorType2;
})(DetectorType || {});

// src/detector/detector.ts
var Detector = class {
  constructor({
    type,
    enabled = true
  }) {
    this.type = -1 /* Unknown */;
    this.enabled = true;
    this.type = type;
    this.enabled = enabled;
    if (this.enabled) {
      registInterval(this);
      this.init();
    }
  }
  onDevToolOpen() {
    console.warn(`You ar not allow to use DEVTOOL! \u3010type = ${this.type}\u3011`);
    if (config.clearIntervalWhenDevOpenTrigger) {
      clearDDInterval();
    }
    clearDDTimeout();
    config.ondevtoolopen(this.type, closeWindow);
    markDevToolOpenState(this.type);
  }
  init() {
  }
};

// src/detector/sub-detector/reg-to-string.ts
var reg_to_string_default = class extends Detector {
  constructor() {
    super({
      type: 0 /* RegToString */,
      enabled: isQQBrowser || isFirefox
    });
  }
  init() {
    this.lastTime = 0;
    this.reg = /./;
    log(this.reg);
    this.reg.toString = () => {
      if (isQQBrowser) {
        const time2 = new Date().getTime();
        if (this.lastTime && time2 - this.lastTime < 100) {
          this.onDevToolOpen();
        } else {
          this.lastTime = time2;
        }
      } else if (isFirefox) {
        this.onDevToolOpen();
      }
      return "";
    };
  }
  detect() {
    log(this.reg);
  }
};

// src/detector/sub-detector/define-id.ts
var define_id_default = class extends Detector {
  constructor() {
    super({
      type: 1 /* DefineId */
    });
  }
  init() {
    this.div = document.createElement("div");
    this.div.__defineGetter__("id", () => {
      this.onDevToolOpen();
    });
    Object.defineProperty(this.div, "id", {
      get: () => {
        this.onDevToolOpen();
      }
    });
  }
  detect() {
    log(this.div);
  }
};

// src/detector/sub-detector/size.ts
var size_default = class extends Detector {
  constructor() {
    super({
      type: 2 /* Size */,
      enabled: !isInIframe && !isEdge
    });
  }
  init() {
    this.checkWindowSizeUneven();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.checkWindowSizeUneven();
      }, 100);
    }, true);
  }
  detect() {
  }
  checkWindowSizeUneven() {
    const screenRatio = countScreenZoomRatio();
    if (screenRatio === false) {
      return true;
    }
    const widthUneven = window.outerWidth - window.innerWidth * screenRatio > 200;
    const heightUneven = window.outerHeight - window.innerHeight * screenRatio > 300;
    if (widthUneven || heightUneven) {
      this.onDevToolOpen();
      return false;
    }
    clearDevToolOpenState(this.type);
    return true;
  }
};
function countScreenZoomRatio() {
  if (checkExist(window.devicePixelRatio)) {
    return window.devicePixelRatio;
  }
  const screen = window.screen;
  if (checkExist(screen)) {
    return false;
  }
  if (screen.deviceXDPI && screen.logicalXDPI) {
    return screen.deviceXDPI / screen.logicalXDPI;
  }
  return false;
}
function checkExist(v) {
  return typeof v !== "undefined" && v !== null;
}

// src/detector/sub-detector/date-to-string.ts
var date_to_string_default = class extends Detector {
  constructor() {
    super({
      type: 3 /* DateToString */
    });
  }
  init() {
    this.count = 0;
    this.date = new Date();
    this.date.toString = () => {
      this.count++;
      return "";
    };
  }
  detect() {
    this.count = 0;
    log(this.date);
    clearLog();
    if (this.count >= 2) {
      this.onDevToolOpen();
    }
  }
};

// src/detector/sub-detector/func-to-string.ts
var func_to_string_default = class extends Detector {
  constructor() {
    super({
      type: 4 /* FuncToString */,
      enabled: !isIOSChrome && !isIOSEdge
    });
  }
  init() {
    this.count = 0;
    this.func = () => {
    };
    this.func.toString = () => {
      this.count++;
      return "";
    };
  }
  detect() {
    this.count = 0;
    log(this.func);
    clearLog();
    if (this.count >= 2) {
      this.onDevToolOpen();
    }
  }
};

// src/detector/sub-detector/debugger.ts
var debugger_default = class extends Detector {
  constructor() {
    super({
      type: 5 /* Debugger */,
      enabled: isIOSChrome || isIOSEdge
    });
  }
  detect() {
    const date = now();
    (() => {
      debugger;
    })();
    if (now() - date > 100) {
      this.onDevToolOpen();
    }
  }
};

// src/detector/sub-detector/performance.ts
var performance_default = class extends Detector {
  constructor() {
    super({
      type: 6 /* Performance */,
      enabled: isChrome
    });
  }
  init() {
    this.maxPrintTime = 0;
    this.largeObjectArray = createLargeObjectArray();
  }
  detect() {
    const tablePrintTime = calculateTime(() => {
      table(this.largeObjectArray);
    });
    const logPrintTime = calculateTime(() => {
      log(this.largeObjectArray);
    });
    this.maxPrintTime = Math.max(this.maxPrintTime, logPrintTime);
    clearLog();
    if (tablePrintTime === 0 || this.maxPrintTime === 0)
      return false;
    if (tablePrintTime > this.maxPrintTime * 10) {
      this.onDevToolOpen();
    }
  }
};

// src/detector/index.ts
var Detectors = {
  [0 /* RegToString */]: reg_to_string_default,
  [1 /* DefineId */]: define_id_default,
  [2 /* Size */]: size_default,
  [3 /* DateToString */]: date_to_string_default,
  [4 /* FuncToString */]: func_to_string_default,
  [5 /* Debugger */]: debugger_default,
  [6 /* Performance */]: performance_default
};
function initDetectors() {
  const typeArray = config.detectors === "all" ? Object.keys(Detectors) : config.detectors;
  typeArray.forEach((type) => {
    const DetectorClass = Detectors[type];
    new DetectorClass();
  });
}

// src/main.ts
function disableDevtool(opts) {
  mergeConfig(opts);
  if (checkTk()) {
    return;
  }
  initInterval();
  disableKeyAndMenu();
  initDetectors();
}
disableDevtool.md5 = md5_default;
disableDevtool.version = version_default;
disableDevtool.DetectorType = DetectorType;
disableDevtool.isDevToolOpened = isDevToolOpened;
function checkTk() {
  if (config.md5) {
    const tk = getUrlParam(config.tkName);
    if (md5_default(tk) === config.md5) {
      return true;
    }
  }
  return false;
}
function checkScriptUse() {
  if (typeof document === "undefined") {
    return;
  }
  const dom = document.querySelector("[disable-devtool-auto]");
  if (!dom) {
    return;
  }
  const json = {};
  ["md5", "url", "tk-name", "interval", "disable-menu", "detectors"].forEach((name) => {
    let value = dom.getAttribute(name);
    if (value !== null) {
      if (name === "interval") {
        value = parseInt(value);
      } else if (name === "disable-menu") {
        value = value === "false" ? false : true;
      } else if (name === "detector") {
        if (value !== "all") {
          value = value.split(" ");
        }
      }
      json[formatName(name)] = value;
    }
  });
  disableDevtool(json);
}
checkScriptUse();

// src/index.ts
var src_default = disableDevtool;

// scripts/dev/index.ts
src_default({
  md5: "0b9e05caf5000360ec1c263335bd83fe",
  ondevtoolopen: (type) => {
    document.body.innerHTML = "devtool opened!; type =" + type;
  },
  ondevtoolclose: () => {
    document.body.innerHTML = "devtool closed!;";
  },
  clearIntervalWhenDevOpenTrigger: true,
  interval: 1e3,
  disableMenu: false,
  clearLog: false,
  disableCopy: true,
  disableSelect: true,
  disablePaste: true
});
document.addEventListener("click", () => {
  const div = document.createElement("div");
  div.innerText = `isOpen = ${src_default.isDevToolOpened()}`;
  document.body.appendChild(div);
});
//# sourceMappingURL=bundle.js.map
