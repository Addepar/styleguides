# @addepar/sass-lint-config

[List of available sass-lint rules](https://github.com/sasstools/sass-lint/tree/master/docs/rules)

## Setup
Add this dependency to devDependencies in your project

`yarn add --dev @addepar/sass-lint-config`

Then add a `.sass-lint.yml` file to the root of your project
```
options:
  config-file: ./node_modules/@addepar/sass-lint-config/config.yml
files:
  include: '[your-project-css-path]/**/*.s+(a|c)ss'
```

## Run sass-lint in your project
`./node_modules/sass-lint/bin/sass-lint.js -vq`

## Disabling rules

### Disable for whole file

```
// sass-lint:disable no-ids

#root {
  ...
}
```

### Disable rule for single line

`color: pink; // sass-lint:disable-line no-color-literals`

### Disable rule for selector block
```
p {
  // sass-lint:disable-block no-color-literals
  color: pink;
}
```
