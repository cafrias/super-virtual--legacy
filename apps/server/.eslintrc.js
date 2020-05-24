module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': 0,
    '@typescript-eslint/no-throw-literal': 0,
  },
};
