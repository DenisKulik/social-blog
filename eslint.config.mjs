import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

const UPPER_LAYERS = ["app", "pages", "widgets", "features", "entities"];

export default tseslint.config(
  {
    ignores: ["build/**", "storybook-static/**", "node_modules/**", "public/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.flat["recommended-latest"].rules,

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Проект декларирует "*.module.scss" как any (src/app/types/global.d.ts),
      // поэтому доступ к CSS-классам даёт any. Семейство no-unsafe-* на таком
      // коде срабатывает на каждом cls.foo и не ловит ничего полезного.
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },

  {
    // В декларациях импорты по построению используются только как типы.
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },

  {
    files: ["**/*.mjs"],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    // Моки для jest пишутся в CommonJS: их грузит require, а не
    // ESM-конвейер ts-jest.
    files: ["config/jest/mocks/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },

  {
    // Конфиги и превью Storybook исполняются в node (main.ts) либо в iframe,
    // поэтому им доступны node-глобалы; stories экспортируют только
    // константы (meta/варианты), react-refresh тут не нужен.
    files: [".storybook/**/*.{ts,tsx}", "**/*.stories.{ts,tsx}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  {
    files: ["config/**/*.ts", "*.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    // Тесты и setup-файл обращаются к describe/it/expect/jest,
    // которых нет в globals.browser.
    files: ["**/*.test.{ts,tsx}", "config/jest/setupTests.ts"],
    languageOptions: {
      globals: globals.jest,
    },
  },

  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: UPPER_LAYERS.map((layer) => `@/${layer}/*`),
              message:
                "FSD: слой shared не должен импортировать верхние слои (app, pages, widgets, features, entities)",
            },
          ],
        },
      ],
    },
  },

  prettier,
);
