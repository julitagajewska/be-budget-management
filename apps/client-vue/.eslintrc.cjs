module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prefer-spread': 'off',
    'no-case-declarations': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn'
  }
}
