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

This repo includes packages that contain configs for the linting tools we use to
enforce these standards. You can install them manually, or you can use one of our
automated workflows to speed up the process.

### Ember

Install the Ember-Toolbox and it will bootstrap your app or addon with all of the
frontend linting and formatting configurations:

```bash
  ember install @addepar/ember-toolbox
```

## Editor Integration

Linting and formatting tools can be integrated with your editor to quickly update your
code and give you feedback as you are typing. It's recommended that you install all of
the editor integrations below for your editor of choice:

* [ESLint](http://eslint.org/docs/user-guide/integrations)
* SassLint ([Atom](https://atom.io/packages/linter-sass-lint))([VSCode](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint))([Sublime](https://packagecontrol.io/packages/SublimeLinter-contrib-sass-lint))([vim](https://github.com/gcorne/vim-sass-lint))
* [Prettier](https://prettier.io/docs/en/editors.html)
