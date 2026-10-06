import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-webpack5";
import type { RuleSetRule } from "webpack";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    // Проверку типов делаем отдельным tsc --noEmit, чтобы не дублировать её
    // в fork-ts-checker внутри Storybook.
    check: false,
  },
  webpackFinal: (webpackConfig) => {
    const projectSourceDir = resolve(process.cwd(), "src");

    // Storybook не тащит загрузчики из конфига проекта, поэтому добавляем
    // те же, что и в config/build/buildLoaders.ts (dev-вариант).
    const tsLoaderRule: RuleSetRule = {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            cacheDirectory: true,
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            compilerOptions: { jsx: "preserve" },
          },
        },
      ],
    };

    const scssLoaderRule: RuleSetRule = {
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: (resourcePath: string) => Boolean(resourcePath.includes(".module.")),
              localIdentName: "[path][name]__[local]",
            },
          },
        },
        "sass-loader",
      ],
    };

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve?.alias,
        "@": projectSourceDir,
      },
    };

    webpackConfig.module = {
      ...webpackConfig.module,
      rules: [...(webpackConfig.module?.rules ?? []), tsLoaderRule, scssLoaderRule],
    };

    webpackConfig.plugins = [
      ...(webpackConfig.plugins ?? []),
      // Ключ __IS_DEV__ используется в src/shared/config/i18n/i18n.ts
      // (debug-режим i18next).
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
      }),
    ];

    return webpackConfig;
  },
};

export default config;
