module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom', 'prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
  ignorePatterns: ['*.config.js'],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
