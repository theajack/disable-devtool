let interval = null;
let calls = [];

export function initInterval (time = 1000) {
    interval = window.setInterval(() => {
        calls.forEach(fn => {fn();});
    }, time);
}

export function registInterval (fn) {
    calls.push(fn);
}

export function clearInterval () {
    window.clearInterval(interval);
}