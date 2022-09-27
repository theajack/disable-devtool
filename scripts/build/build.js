/*
 * @Author: tackchen
 * @Date: 2022-08-03 21:07:04
 * @Description: Coding something
 */

const execa = require('execa');
const {resolveRootPath, copyFile, buildPackageJson, writeJsonIntoFile, write} = require('./utils');
const pkg = require('../../package.json');

async function build () {
  await execa(
    'node',
    [
      resolveRootPath('node_modules/rollup/dist/bin/rollup'),
      '-c',
      resolveRootPath('scripts/build/rollup.config.js'),
      // '--environment',
      // [
      //   `PACKAGE_NAME:${dirName}`,
      // ],
    ],
    {stdio: 'inherit'},
  );
}

async function main () {
  const version = process.argv[2];
  if (!version) throw new Error('Invalid version');
  pkg.version = version;
  writeJsonIntoFile('@package.json', pkg);

  write('@src/version.ts', `export default '${pkg.version}';`);
  await build();
  buildPackageJson();
  copyFiles();
}


function copyFiles () {
  copyFile('@LICENSE', '@npm/LICENSE');
  copyFile('@README.md', '@npm/README.md');
}

main();

