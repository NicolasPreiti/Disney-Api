// 'use strict';

module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    // 'strict': [
    //   'error',
    //   'safe',
    // ],
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-multiple-empty-lines': [ 
      'error', 
      { 'max': 1 }, 
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'block-spacing': [
      'error',
      'always',
    ],
    'space-in-parens': [
      'error',
      'never',
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always',
        'objects': 'always-multiline',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never',
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'arrow-spacing': [
      'error',
      { 
        'before': true,
        'after': true, 
      },
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'sort-imports': [
      'error', 
      {
        'ignoreCase': false,
        'ignoreDeclarationSort': false,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single',],
        'allowSeparatedGroups': false,
      },
    ],
  },
};
