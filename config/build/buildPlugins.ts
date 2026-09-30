import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin,
  type WebpackPluginInstance,
} from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type { BuildOptions } from "./types/config";

export function buildPlugins({
  paths,
  isDev,
}: BuildOptions): WebpackPluginInstance[] {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
    ...(isDev
      ? [new ReactRefreshWebpackPlugin(), new HotModuleReplacementPlugin()]
      : []),
  ];
}
