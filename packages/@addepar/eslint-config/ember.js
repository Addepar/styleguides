/*
  Shareable ESLint Config

  https://eslint.org/docs/developer-guide/shareable-configs
*/
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'plugin:ember/recommended',
    'plugin:ember-best-practices/recommended'
  ],
  rules: { }
};
