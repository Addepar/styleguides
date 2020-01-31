# @addepar/eslint-config

This ESLint plugin supports both Javascript and Ember.js linting.

Ember.js specific rules from [eslint-plugin-ember](https://github.com/ember-cli/eslint-plugin-ember).

## Using the plugin with Ember CLI

### Installation

Install the plugin as a dev dependency in your Ember CLI project.

```bash
yarn add --dev @addepar/eslint-config
```

### Configuration

To include just Javascript rules:

```js
// .eslintrc.js
module.exports = {
  extends: ["@addepar"],
  rules: {
    // custom rules
    // rules overrides
  }
};
```

To include just Ember.js rules:

```js
// .eslintrc.js
module.exports = {
  extends: ["@addepar/eslint-config/ember"],
  rules: {
    // custom rules
    // rules overrides
  }
};
```
