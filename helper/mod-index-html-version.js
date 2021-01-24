const pkg = require('../package.json');
const util = require('./util');

function modIndexHtmlVersion () {
    util.read('index.html', (html) => {
        let res = html.match(new RegExp(`https://cdn.jsdelivr.net/npm/disable-devtool@.*/disable-devtool.min.js#use`));
        if (res) {
            util.write('index.html', html.replace(res[0], `https://cdn.jsdelivr.net/npm/disable-devtool@${pkg.version}/disable-devtool.min.js#use`));
        }
    });
}

modIndexHtmlVersion();