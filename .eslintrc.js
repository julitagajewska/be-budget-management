module.exports = {
  root: true,
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
