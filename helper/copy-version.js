const pkg = require('../package.json');
const util = require('./util');

function main () {
    util.write('src/version.js', `export default '${pkg.version}';`);
}

main();