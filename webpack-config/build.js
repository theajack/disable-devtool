const path = require('path');
require('../helper/copy-to-npm');

module.exports = {
    mode: 'production',
    entry: path.resolve('./', 'src/index.js'),
    output: {
        path: path.resolve('./', 'npm'),
        filename: 'ebuild.min.js',
        library: 'ebuild',
        libraryTarget: 'umd',
        umdNamedDefine: true,
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