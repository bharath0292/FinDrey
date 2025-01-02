module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'next/core-web-vitals',
    'next/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react-refresh',
    'prettier',
    'import',
    'simple-import-sort',
    'react-hooks',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'max-len': ['error', { code: 100 }],
    'simple-import-sort/imports': [
      'error',
      {
        // Define custom groups
        groups: [
          // Side effect imports
          ['^\\u0000'],
          // Node.js built-in modules. You can remove this if you don't use Node.js
          ['^react', '^@?\\w'],
          // Packages. `react` related packages come first, followed by other packages
          ['^@findrey', '^@?\\w'],
          // Internal packages. Your internal packages starting with @quantdrey
          ['^@', '^@findrey'],
          // Parent imports. (`../../`)
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Relative imports. (`../`)
          ['^\\.\\./?$'],
          // Index imports (`./`)
          ['^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
};
