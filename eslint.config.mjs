// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // rules: {
    //   '@typescript-eslint/no-explicit-any': 'off',// 这是用于关闭禁止使用 any 类型的规则
    //   '@typescript-eslint/no-floating-promises': 'warn',// 这是用于警告未处理的 Promise 的规则
    //   '@typescript-eslint/no-unsafe-argument': 'warn',// 这是用于警告传递给函数的参数类型不安全的规则
    //   "prettier/prettier": ["error", { endOfLine: "auto" }],
    // },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off', //这是用于关闭接口命名必须以 I 开头的规则
      '@typescript-eslint/explicit-function-return-type': 'off',//这是用于关闭函数必须显式指定返回类型的规则
      '@typescript-eslint/explicit-module-boundary-types': 'off',//这是用于关闭模块边界必须显式指定类型的规则
      '@typescript-eslint/no-explicit-any': 'off',//这是用于关闭禁止使用 any 类型的规则
      'no-unused-vars': 'off',//这是用于关闭禁止出现未使用的变量的规则
      '@typescript-eslint/no-unused-vars': 'off',//这是用于关闭禁止出现未使用的变量的规则（TypeScript 版本）
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
);
