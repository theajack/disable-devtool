/*
 * @Author: tackchen
 * @Date: 2022-09-27 21:46:40
 * @Description: Coding something
 */
import disableDevtool from '../../src';
// import disableDevtool from '../../npm';

// window.addEventListener('popstate', function (event) {
//   event.preventDefault();
// });
disableDevtool({
  md5: '0b9e05caf5000360ec1c263335bd83fe', // ddtk
  // url: 'https://www.qq.com',
  ondevtoolopen: (type, next) => {
    // window.location.href = 'https://www.qq.com';
    document.body.innerHTML = 'devtool opened!; type =' + type;
    // next();
    // console.log(next);
  },
  ondevtoolclose: () => {
    // window.location.href = 'https://www.qq.com';
        
    document.body.innerHTML = 'devtool closed!;';
    // next();
    // console.log(next);
  },
  clearIntervalWhenDevOpenTrigger: true,
  interval: 1000,
  // tkName: 'ddtk',
  // disableMenu: false,
  // clearLog: false,
  // disableCopy: true,
  // disableSelect: true,
  // disablePaste: true,
  // url: 'https://www.baidu.com'
  // detectors: [disableDevtool.DetectorType.DATE_TO_STRING],

  // ignore: ['aaaa', /[xy]+/],
  // ignore: () => window.ignore === undefined
});
document.addEventListener('click', () => {
  const div = document.createElement('div');
  div.innerText = `isOpen = ${disableDevtool.isDevToolOpened()}`;
  document.body.appendChild(div);
  // alert(disableDevtool.isDevToolOpened());


  // disableDevtool.isSuspend = !disableDevtool.isSuspend;
  // alert(disableDevtool.isSuspend);
});

console.log(disableDevtool.version);
console.log(disableDevtool.md5('xx'));


// import {log} from '../src/log';

// setTimeout(() => {
//     log(111);
//     debugger;
// }, 3000);


// window.log = log;