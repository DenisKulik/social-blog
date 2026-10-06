import type { Config } from "jest";
import path from "path";

// jest 30 на Node 24 грузит этот файл как ESM (нативный type-stripping),
// поэтому __dirname недоступен. Конфиг держим в корне целиком: в ESM
// обязательны расширения в импортах, а jest читает только файл из
// rootDir, так что разбивка на config/jest/ потребовала бы явных
// путей вида "./config/jest/index.ts" и ломалась бы при каждом рефакторинге.
const ROOT = import.meta.dirname;
const JEST_DIR = path.resolve(ROOT, "config", "jest");
const SRC = path.resolve(ROOT, "src");

const mock = (name: string) => path.resolve(JEST_DIR, "mocks", name);

const config: Config = {
  rootDir: ROOT,

  testEnvironment: "jsdom",

  // Тесты живут рядом с кодом, в отступлении от глобальных модулей.
  roots: [SRC],

  testMatch: ["**/*.test.{ts,tsx}"],

  // Полифилы jsdom должны отработать до импорта тестового файла.
  setupFiles: [path.resolve(JEST_DIR, "setupPolyfills.ts")],

  // Матчеры @testing-library/jest-dom регистрируются после инициализации
  // тестового фреймворка, до выполнения тестов.
  setupFilesAfterEnv: [path.resolve(JEST_DIR, "setupTests.ts")],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        // Типы проверяет pnpm typecheck, а не тесты: отдельный tsconfig
        // для jest не нужен. Даже с diagnostics: true проверки не было бы —
        // isolatedModules: true в корневом tsconfig уводит ts-jest в
        // transpileModule, который типы не смотрит.
        diagnostics: false,
      },
    ],
  },

  moduleNameMapper: {
    // Тот же алиас, что и в webpack: buildResolvers отдаёт "@" -> src.
    "^@/(.*)$": path.join(SRC, "$1"),

    // Тестовые хелперы (testI18n, render с провайдерами) лежат рядом
    // с jest-конфигом, а не в src: в прод-код они не должны попадать.
    "^@test/(.*)$": path.join(JEST_DIR, "$1"),

    // CSS Modules: cls.foo возвращает "foo", поэтому в тестах видно
    // исходное имя класса, а не хеш.
    "\\.module\\.s?css$": mock("cssModuleMock.js"),

    // Глобальные стили в тестах не применяются.
    "\\.s?css$": mock("fileMock.js"),

    // @svgr/webpack в webpack отдаёт React-компонент.
    "\\.svg$": mock("svgMock.js"),

    // Статика из file-loader.
    "\\.(png|jpe?g|gif|webp|avif|woff2?|eot|ttf|otf)$": mock("fileMock.js"),

    // CJS-сборка @ant-design/icons тянет ESM-файл напрямую:
    // require("@ant-design/colors/es/generate"). В Jest без ESM-конвейера
    // это падает, поэтому перенаправляем на CJS- twin из ./lib.
    "^@ant-design/colors/es/(.*)$": "@ant-design/colors/lib/$1",
  },

  clearMocks: true,

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/index.tsx",
  ],
};

export default config;
