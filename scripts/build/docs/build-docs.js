/*
 * @Author: tackchen
 * @Date: 2022-09-28 00:48:05
 * @Description: Coding something
 */
const {read, write, mkdirDir, copyFile} = require('../utils');

function modIndexHtmlVersion () {
  const version = process.argv[2] || 'latest';
  const html = read('@scripts/build/docs/index.html');
  const res = html.match(new RegExp(`https://cdn.jsdelivr.net/npm/disable-devtool@.*/disable-devtool.min.js#use`));
  mkdirDir('@docs');
  if (res) {
    copyFile('@.gitignore', '@docs/.gitignore');
    copyFile('@scripts/build/docs/404.html', '@docs/404.html');
    write('@docs/index.html', html.replace(res[0], `https://cdn.jsdelivr.net/npm/disable-devtool@${version}/disable-devtool.min.js#use`));
  }
}

modIndexHtmlVersion();