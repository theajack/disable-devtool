const childProcess = require('child_process');

async function exec (cmd) {
    return new Promise((resolve) => {
        childProcess.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                resolve({success: false, stdout, stderr});
            } else {
                resolve({
                    success: true,
                    stdout,
                    stderr,
                });
            }
        });
    });
}

module.exports = {
    exec,
};
