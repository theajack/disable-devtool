/*
 * @Author: tackchen
 * @Date: 2022-08-03 20:37:59
 * @Description: Coding something
 */
const {build} = require('esbuild');
const {resolve} = require('path');
const {yamlPlugin} = require('esbuild-plugin-yaml');
const {dtsPlugin} = require('esbuild-plugin-d.ts');

const outfile = resolve(__dirname, './dev/bundle.js');
build({
  entryPoints: [resolve(__dirname, './dev/index.ts')],
  outfile,
  bundle: true,
  sourcemap: true,
  format: 'cjs',
  globalName: 'LernaDemo',
  platform: 'browser',
  // plugins:
  //   format === 'cjs' || pkg.buildOptions?.enableNonBrowserBranches
  //     ? [nodePolyfills.default()]
  //     : undefined,
  // define: {
  //   __COMMIT__: '"dev"',
  //   __VERSION__: `"${pkg.version}"`,
  // },
  plugins: [
    yamlPlugin(),
    dtsPlugin(),
  ],
  watch: {
    onRebuild (error) {
      if (!error) console.log(`rebuilt: ${outfile}`);
    },
  },
}).then(() => {
  console.log(`watching: ${outfile}`);
});

 