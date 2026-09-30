import type { BuildOptions } from "./types/config";
import type { Configuration } from "webpack";
import { buildDevServer, buildLoaders, buildPlugins, buildResolvers } from "./";

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode: mode,
    entry: isDev
      ? [
          "@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry",
          paths.entry,
        ]
      : paths.entry,
    output: {
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    ...(isDev
      ? {
          devtool: "inline-source-map",
          devServer: buildDevServer(options),
        }
      : {}),
  };
}
