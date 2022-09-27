/*
 * @Author: tackchen
 * @Date: 2022-07-25 08:31:19
 * @Description: Coding something
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  'globals': {
    'globalThis': true,
  },
  env: {
    'browser': true,
    'es6': true,
    'node': true,
    'commonjs': true,
  },
  'parserOptions': {
    'sourceType': 'module' // ts 中使用 es 模块
  },
  'rules': {
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': [
      'error',
      'interface'
    ],
    '@typescript-eslint/no-unused-vars': 'error', // 使用 ts 未使用变量的规则 比如枚举类型在es中会报错
    'no-extend-native': 0,
    'no-new': 0,
    'no-useless-escape': 0,
    'no-useless-constructor': 0,
    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'space-infix-ops': ['error', {'int32Hint': false}],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],
    'semi': ['error', 'always'],
    'comma-dangle': 0,
    'no-console': 0,
    'no-debugger': 0,
    'id-length': 0,
    'eol-last': 0,
    'object-curly-spacing': ['error', 'never'],
    'arrow-spacing': 'error',
    'no-multiple-empty-lines': 'error',
    'spaced-comment': 'error',
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'no-unreachable': 'error',
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'semi-spacing': 'error',
    'comma-spacing': 'error',
    'key-spacing': 'error',
    'no-undef': 'error',
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }]
  }
};