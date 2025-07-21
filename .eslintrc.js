module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // Vue rules
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'error',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': 'error',
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    'vue/no-v-html': 'warn',
    'vue/order-in-components': 'error',
    'vue/this-in-template': 'error',

    // General JavaScript/TypeScript rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
  },
  overrides: [
    // Main process (Electron backend) specific rules
    {
      files: ['src/main/**/*.ts'],
      env: {
        node: true,
        browser: false,
      },
      rules: {
        'no-console': 'off', // Allow console in main process
      },
    },
    // Renderer process (Vue frontend) specific rules
    {
      files: ['src/renderer/**/*.{vue,ts}'],
      env: {
        browser: true,
        node: false,
      },
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      },
    },
    // Configuration files
    {
      files: ['*.config.{js,ts}', '.eslintrc.{js,ts}'],
      env: {
        node: true,
      },
    },
  ],
}
