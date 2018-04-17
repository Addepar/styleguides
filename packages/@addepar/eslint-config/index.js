module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'brackets',
    'class-property',
    'fat-arrow-same-line',
    'import',
    'prefer-let'
  ],
  extends: [
    'eslint:recommended'
  ],
  env: {
    'browser': true,
    'es6': true
  },
  rules: {
    // ES6
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'always'],

    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

    'camelcase': ['error', { 'properties': 'never' }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'comma-style': ['error', 'last'],
    'curly': ['error', 'all'],

    'dot-notation': 'error',
    'dot-location': ['error', 'property'],

    'eqeqeq': ['error', 'always'],
    'eol-last': ['error', 'always'],

    'func-call-spacing': ['error', 'never'],

    'indent': ['error', 2, { 'SwitchCase': 1 }],

    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': ['error', {
      'overrides': {
        'catch': {
          'after': false
        }
      }
    }],

    'max-statements-per-line': ['error', { 'max': 1 }],

    'no-trailing-spaces': 'error',
    'no-empty': ['error'],
    'no-var': 'error',
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false
      }
    ],
    'no-useless-rename': 'error',
    'no-useless-concat': 'error',

    'object-shorthand': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'one-var': ['error', {
      'uninitialized': 'always',
      'initialized': 'never'
    }],
    'operator-linebreak': ['error', 'before'],

    'prefer-spread': 'error',
    'prefer-template': 'error',

    'generator-star-spacing': ['error', {
      'before': false,
      'after': true
    }],

    'quotes': ['error', 'single', { 'avoidEscape': true }],

    'semi': ['error', 'always'],
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': ['error', 'always'],

    // Overrides for Ember
    'new-cap': ['error', {
      'capIsNewExceptions': ['A']
    }],

    // Prevent using globals, import
    'no-restricted-globals': [
      'error', // Specifies the error level

      'Ember',
      'QUnit',
      'jQuery',
      '$'
    ],

    'no-restricted-imports': [
      'error',

      'ember'
    ],

    // Class property plugin rules
    'class-property/class-property-semicolon': 2,

    // Brackets plugin rules
    'brackets/array-bracket-newline': ['error', { onePerLine: true }],
    'brackets/call-parens-newline': ['error', { onePerLine: true }],
    'brackets/conditional-parens-newline': ['error'],
    'brackets/func-parens-newline': ['error', { onePerLine: true }],
    'brackets/object-curly-newline': ['error', { onePerLine: true }],

    // Fat arrow plugin rules
    'fat-arrow-same-line/fat-arrow-same-line': ['error', {
      allowObjects: true,
      allowArrays: true,
      allowTemplates: true,
      allowNew: true,
      allowBoolExpressions: true,
      allowMembers: ['create']
    }],

    // Import plugin rules
    'import/first': 2,
    'import/newline-after-import': 2,

    // Prefer let
    'prefer-let/prefer-let': 2
  }
};
