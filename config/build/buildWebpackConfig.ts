import type { BuildOptions } from "./types/config";
import type { Configuration } from "webpack";
import path from "path";
import { buildLoaders, buildPlugins, buildResolvers } from "./";

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { paths, mode } = options;

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
  };
}
