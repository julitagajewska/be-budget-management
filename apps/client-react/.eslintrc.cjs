module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:json/recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'react-refresh', 'jest', 'json'],
    rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "prefer-spread": "off",
    "no-case-declarations": "off",
    "no-console": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
  },
};
