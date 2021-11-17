module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
  ignorePatterns: ['.eslintrc.js', 'tsconfig.json'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        // newlinesBetween: 'always', // new line between groups
        groups: [
          'module',
          '/^@configs/',
          '/^@data/',
          '/^@dtos/',
          '/^@exceptions/',
          '/^@rabbit-mq/',
          '/^@shared/',
          '/^@stock/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
