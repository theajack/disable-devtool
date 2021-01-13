// import disableDevtool from '../src';
import disableDevtool from '../npm';

disableDevtool({
    md5: 'd4de605ccb923b7e876b3218a1474653',
    // url: 'https://www.qq.com',
    // ondevtoolopen: () => {
    //     window.location.href = 'https://www.qq.com';
    // },
    interval: 1000,
    tkName: 'xx',
    // url: 'https://www.baidu.com'
});

console.log(disableDevtool.version);
console.log(disableDevtool.md5('theajack'));