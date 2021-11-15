import disableDevtool from '../src';
// import disableDevtool from '../npm';

// debugger;

disableDevtool({
    md5: '0b9e05caf5000360ec1c263335bd83fe', // ddtk
    // url: 'https://www.qq.com',
    // ondevtoolopen: () => {
    //     window.location.href = 'https://www.qq.com';
    // },
    interval: 1000,
    // tkName: 'ddtk',
    // disableMenu: false
    // url: 'https://www.baidu.com'
    // detectors: [disableDevtool.DETECTOR_TYPE.DATE_TO_STRING],
});

// console.log(disableDevtool.version);
// console.log(disableDevtool.md5('xx'));