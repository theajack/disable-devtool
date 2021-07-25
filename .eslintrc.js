module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "commonjs": true
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "arrowFunctions": true,
      "classes": true,
      "modules": true,
      "defaultParams": true,
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module",
    "parserOptions": {
      "allowImportExportEverywhere": true
    }
  },
  "globals": {
    "window": true,
  },
  "rules": {
    "no-extend-native": 0,
    "no-new": 0,
    "no-useless-escape": 0,
    "no-useless-constructor": 0,
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "indent": ["error", 4, {
      "SwitchCase": 1
    }],
    "space-infix-ops": ["error", {"int32Hint": false}],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }],
    "semi": ["error", "always"],
    "comma-dangle": 0,
    "no-console": 0,
    "no-debugger": 0,
    "id-length": 0,
    "eol-last": 0,
    "object-curly-spacing": ["error", "never"],
    "arrow-spacing": "error",
    "no-multiple-empty-lines": "error",
    "no-unused-vars": "error",
    "spaced-comment": "error",
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "no-unreachable": "error",
    "keyword-spacing": "error",
    "space-before-blocks": "error",
    "semi-spacing": "error",
    "comma-spacing": "error",
    "key-spacing": "error",
    "no-undef": "error",
    "prefer-const": "error"
  }
}