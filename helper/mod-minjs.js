
const util = require('./util');

function main () {
    var file = 'npm/disable-devtool.min.js';
    util.read(file, (code) => {
        util.write(file, code.replace(/[a-z]\){/i, (str) => {
            let n = str[0];
            return `${str}var _f=${n};${n}=function(){return _f().default};`;
        }));
    });
}
main();