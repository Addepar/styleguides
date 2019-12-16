'use strict';

module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  overrides: [
    {
      files: '*.hbs',
      options: {
        singleQuote: false
      }
    }
  ]
};
