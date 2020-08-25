module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    //hooks规则检测
    "react-hooks/rules-of-hooks": "error",
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止空语句块
    "no-empty": 2,
    // 禁止不必要的括号 //(a * b) + c;//报错
    "no-extra-parens": 0,
    // 控制逗号前后的空格
    "comma-spacing": [2, {
      "before": false,
      "after": true
    }],
    // 缩进为2
    "indent": [
      "error", 2
    ],
    // 不允许多个空行
    "no-multiple-empty-lines": [2, {
      "max": 2
    }],
    // 禁用行尾空格
    "no-trailing-spaces": 2,
    // 禁止属性前有空白
    "no-whitespace-before-property": 2,
    // 强制分号之前和之后使用一致的空格
    "semi-spacing": 2,
    // 禁止未使用的变量
    "no-unused-vars": 0,
    // 强制在 function的左括号之前使用一致的空格
    "space-before-function-paren": [2, "always"],
    // 禁止重复的 case 标签
    "no-duplicate-case": 2,
    //要求或禁止在函数标识符和其调用之间有空格
    "func-call-spacing": 2,
    // 强制在 JSX 属性中一致地使用双引号或单引号
    "jsx-quotes": 2,
    // 要求 return 语句之前有一空行
    "newline-before-return": 0,
    //禁止修改const声明的变量
    "no-const-assign": 2,
    //禁止使用eval
    "no-eval": 1,
    // 属性类型校验
    "react/prop-types": 0,
    // 未定义的变量
    "no-undef": 0,
    // 禁用dispaly-name
    "react/display-name": 0,
    "no-constant-condition": 0,
  }
};