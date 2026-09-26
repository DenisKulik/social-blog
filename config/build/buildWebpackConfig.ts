import type { BuildOptions } from "./types/config";
import type { Configuration } from "webpack";
import path from "path";
import { buildDevServer, buildLoaders, buildPlugins, buildResolvers } from "./";

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    ...(isDev
      ? {
          devtool: "inline-source-map",
          devServer: buildDevServer(options),
        }
      : {}),
  };
}
