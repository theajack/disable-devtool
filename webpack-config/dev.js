const path = require('path');

module.exports = {
    entry: path.resolve('./', 'public/main.js'),
    output: {
        path: path.resolve('./', 'public'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve('./', 'public'),
        historyApiFallback: true,
        inline: true,
        host: 'localhost'// '0.0.0.0' //
    },
    module: {
        rules: [{
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            test: /(.js)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: /node_modules/,
            options: {
                configFile: './.eslintrc.js'
            }
        }]
    }
};