let fs = require('fs');

module.exports = {
    write: function (file, txt, cb) {
        fs.writeFile(file, txt, 'utf8', (err) => {
            if (err) throw err;
            if (cb)cb();
        });
    },

    pick: function ({data = {}, target, attrs}) {
        if (!attrs) {
            attrs = Object.keys(target);
        }
        attrs.forEach(name => {
            if (typeof target[name] !== 'undefined')
                data[name] = target[name];
        });
        return data;
    }
};