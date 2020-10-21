### This is a project build with [EBuild-Cli](https://github.com/theajack/ebuild-cli)

### Install dependencies

```
npm install
```

use taobao repository

```
npm install --registry https://registry.npm.taobao.org
```

### Init git repository

```
git init
git add README.md
git commit -m "first commit"
git remote add origin {Your remote git repository address}
git push -u origin master
```

### Commond

```
npm run dev
npm run build
npm run build:npm
npm run publish
npm run lint
npm run copy-latest
npm run modify-version
npm run copy-npm
```

### ebuild.config.js

```js
module.exports = {
    'tranToEs5InNpm': true, // wether use babel
    'packageFiles': [
        './package.json'
        // config which package.json files need to modify version
        // '../npm/package.json', // this is an example
    ],
    'versioJsEs6Module': true, // use es6(export default) or require(module.exports=)
    'versioJsFiles': [
        // config which version.js files need to modify version
        // '../npm/version.js', // this is an example
    ],
    'name': '',
    'version': '0.0.1',
    'npmExternals': {
        // example
        // 'md5': 'md5'
    },
    'npmPaths': [
        'npm'
    ]
};
```

### Vscode plugin

Install 'ESLint' plugin