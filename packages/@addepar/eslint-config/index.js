module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'import',
    'prefer-let',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  env: {
    'browser': true,
    'es6': true,
  },
  rules: {
    // ES6 rules not covered by Prettier
    'camelcase': ['error', { 'properties': 'never' }],
    'curly': ['error', 'all'],
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'max-statements-per-line': ['error', { 'max': 1 }],
    'no-empty': ['error'],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false,
      },
    ],
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': ['error', 'always'],
    'one-var': ['error', {
      'uninitialized': 'always',
      'initialized': 'never',
    }],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quotes': ['error', 'single', { 'avoidEscape': true }],
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

    // Prettier plugin
    'prettier/prettier': 'error',

    // Import plugin rules
    'import/first': 2,
    'import/newline-after-import': 2,

    // Prefer let
    'prefer-let/prefer-let': 2,
  },
};
