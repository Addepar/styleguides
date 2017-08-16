# Addepar Styleguides

Welcome to Addepar's official code styleguides! These code styles are the
defaults for Addepar projects, and in general should be followed for consistency.
Individual projects may choose to modify these rules, but should try to stay as
close to the guide as possible to make switching between different scopes easier
overall.

## Styleguides

* [Javascript](https://github.com/Addepar/styleguides/blob/master/frontend/javascript.md)
* [Ember](https://github.com/Addepar/styleguides/blob/master/frontend/ember.md)

## New Projects

These rules are automatically enforced using linting tools such as ESLint and
Sasslint.

For frontend projects with you can add them by running:

```
  yarn add --dev @addepar/eslint-config
  yarn add --dev @addepar/sass-lint-config
```

And adding the following config files:

```javascript
// .eslintrc.js
module.exports = {
  extends: '@addepar'
};
```

```yaml
# .sass-lint.yml
options:
  config-file: node_modules/@addepar/sass-lint-config/config.yml
```

## Editor Integration

Linting tools can be integrated into most editors to give you instant feedback as you
type code. You can find out how to integrate with your editor of choice [here](http://eslint.org/docs/user-guide/integrations).


