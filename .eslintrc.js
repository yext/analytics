module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': ['error'],
    'no-multi-spaces': ['error'],
    quotes: ['error', 'single'],
    'space-before-function-paren': [
      'error',
      {
        named: 'never',
        anonymous: 'never',
      },
    ],
    'keyword-spacing': ['error'],
    'quote-props': ['error', 'as-needed'],
    'max-len': [
      'error',
      {
        code: 110,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
      },
    ],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
  },
  ignorePatterns: ['lib', 'test-site'],
};
