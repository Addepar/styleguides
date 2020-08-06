/*
  Shareable ESLint Config

  https://eslint.org/docs/developer-guide/shareable-configs
*/
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  extends: ["plugin:ember/recommended"],
  rules: {},
  overrides: [
    // node files
    {
      files: [
        "index.js",
        "testem.js",
        "ember-cli-build.js",
        "config/**/*.js",
        "tests/dummy/config/**/*.js"
      ],
      excludedFiles: [
        "app/**",
        "packages/*/app/**",
        "packages/@addepar/*/app/**",
        "addon/**",
        "packages/*/addon/**",
        "packages/@addepar/*/addon/**",
        "addon-test-support/**",
        "packages/*/addon-test-support/**",
        "packages/@addepar/*/addon-test-support/**",
        "tests/dummy/app/**",
        "packages/*/tests/dummy/app/**",
        "packages/@addepar/*/tests/dummy/app/**"
      ],
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ["node"],
      rules: Object.assign(
        {},
        require("eslint-plugin-node").configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here
        }
      )
    }
  ]
};
