const path = require('path');
require('../helper/copy-to-npm');
require('../helper/copy-version');

module.exports = {
    mode: 'production',
    entry: path.resolve('./', 'src/index.js'),
    output: {
        path: path.resolve('./', 'npm'),
        filename: 'disable-devtool.min.js',
        library: 'DisableDevtool',
        libraryTarget: 'umd',
        umdNamedDefine: true, // 这个地方暂时有问题 打包出来的时 {default: DisableDevtool} 临时解决是直接修改打包后的文件
        globalObject: 'this'
    },
    module: {
        rules: [{
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }]
        }]
    }
};